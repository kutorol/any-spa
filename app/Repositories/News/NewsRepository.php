<?php

declare(strict_types=1);

namespace App\Repositories\News;

use App;
use App\Enums\Common\Locale;
use App\Http\Controllers\Api\BaseController;
use App\Models\News\News;
use App\Models\News\NewsDuplicate;
use App\Models\News\NewsLike;
use App\Models\User;
use DB;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection as SCollection;

class NewsRepository
{
    public const PER_PAGE = 12;

    public function find(int $page = 1, ?User $user = null, int $id = 0): LengthAwarePaginator
    {
        return $this->query($id, $user)
            ->orderBy('news.id', 'desc')
            ->paginate(self::PER_PAGE, [], 'page', $page);
    }

    public function findAdmin(int $page = 1): LengthAwarePaginator
    {
        return $this->query(0, null, true)
            ->orderBy('news.id', 'desc')
            ->paginate(self::PER_PAGE, [], 'page', $page);
    }

    public function findFavorite(User $user, int $page = 1): LengthAwarePaginator
    {
        $q = NewsLike::where('news_like.user_id', $user->id)
            ->join('news', 'news_like.news_id', '=', 'news.id');

        return $this->setSelect($q)
            ->addSelect(DB::raw('true AS is_liked'))
            ->orderBy('news.id', 'desc')
            ->paginate(self::PER_PAGE, [], 'page', $page);
    }

    private function query(int $id = 0, ?User $user = null, bool $isAdmin = false, ?Locale $locale = null): Builder
    {
        $news = News::where('news.locale', $locale->value ?? App::getLocale());
        if ($isAdmin && !$locale) {
            $news = News::whereRaw('1 = 1');
        }

        if ($id > 0) {
            $news->where('id', $id);
        }

        return $this->addCommonQuery($news, $user, $isAdmin);
    }

    public function findInfo(int $id, ?User $user = null): Model|Builder|News|null
    {
        return $this->query($id, $user)
            ->addSelect(['news.text', 'news.updated_at'])
            ->first();
    }

    public function findInfoAdmin(int $id, ?User $user = null, ?Locale $locale = null): Model|Builder|News|null
    {
        return $this->query($id, $user, true, $locale)
            ->addSelect(['news.text', 'news.updated_at'])
            ->first();
    }

    public function findShortLikes(News $newsInfo): Collection
    {
        return $newsInfo->userLikes()
            ->select(['news_like.user_id', 'users.avatar', 'users.name'])
            ->join('users', 'news_like.user_id', '=', 'users.id')
            ->limit(10)
            ->get()->each(function (NewsLike $like) {
                $like->avatar = getAvatarURL($like->avatar);
                $like->name = getSplitName($like->name)['first_name'];
            });
    }

    public function findShortDuplicates(News $newsInfo, ?User $user = null): SCollection
    {
        $duplicates = NewsDuplicate::where('news_duplicate.news_id', $newsInfo->id)
            ->join('news', 'news_duplicate.duplicate_news_id', '=', 'news.id');

        return $this->addCommonQuery($duplicates, $user)->get();
    }

    /**
     * @param $q
     * @return Builder
     */
    private function setSelect($q)
    {
        $q->select([
            'news.id',
            'news.locale',
            'news.slug',
            'news.created_at',
            'news.updated_at',
            'news.image',
            'news.title',
            'news.short_text',
            'news.views',
            'news.likes',
        ]);

        return $q;
    }

    private function addCommonQuery($q, ?User $user, bool $isAdmin = false)
    {
        $this->setSelect($q);

        if (!$isAdmin && $user) {
            $q
                ->leftJoin('news_like', function ($q) use ($user) {
                    $q->on('news.id', '=', 'news_like.news_id')
                        ->where('news_like.user_id', $user->id);
                })
                ->addSelect(DB::raw('CASE WHEN news_like.user_id IS NULL THEN false ELSE true END AS is_liked'));
        } else {
            $q->addSelect(DB::raw('false AS is_liked'));
        }

        return $q;
    }

    public function updateViews(News $newsInfo): bool
    {
        $newsInfo->views += 1;

        return $newsInfo->save();
    }

    public function findBeforeAndAfterNews(int $id, ?User $user): SCollection
    {
        $before = $this->query(0, $user)->where('id', '<', $id)->orderBy('id', 'desc')->take(4);
        $after = $this->query(0, $user)->where('id', '>', $id)->orderBy('id', 'asc')->take(4);

        return $before->union($after)->orderBy('id', 'desc')->get();
    }

    /**
     * Находит минимальную версию для составления sitemap.xml.
     * @return Collection
     */
    public function findForSiteMap(): Collection
    {
        return News::all([
            'id', 'slug', BaseController::LOCALE_PARAM, 'updated_at',
        ]);
    }

    /**
     * Удаление новости и удаление всех ее связей.
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return (bool)News::where('id', $id)->delete();
    }
}
