import { ButtonGroup, Grid } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import useMatch from "../../../../hooks/useMatch";
import Btn from "../Btn/Btn";
import Icon from "../Common/Icon";

interface ICustomMarkdown {
  text: string;
  prettyBtn?: boolean;
}

const CustomMarkdown = ({ text, prettyBtn }: ICustomMarkdown) => {
  const [isPretty, setIsPretty] = useState<boolean>(true);
  const { t } = useLaravelReactI18n();
  const withoutPrettyTitle = t("Оригинал");
  const withPrettyTitle = t("Красиво");
  const { matchDownMd } = useMatch();

  return (
    <Grid container>
      <Grid item md={prettyBtn ? 8 : 12} xs={12} order={{ xs: 2, md: 1 }}>
        {isPretty ? (
          <Markdown
            className="markdown-pretty"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");

                return !inline && match ? (
                  <SyntaxHighlighter
                    style={dracula}
                    PreTag="div"
                    language={match[1]}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {text}
          </Markdown>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              // @ts-ignore
              __html: text.replaceAll("\n", "<br/>")
            }}
          />
        )}
      </Grid>

      {prettyBtn && (
        // @ts-ignore
        <Grid
          item
          md={4}
          xs={12}
          order={{ xs: 1, md: 2 }}
          sx={matchDownMd ? { mb: 2 } : {}}
          align={matchDownMd ? "center" : "right"}
        >
          <ButtonGroup
            variant="contained"
            color="secondary"
            sx={{ boxShadow: "none" }}
          >
            <Btn
              size="small"
              onClick={e => setIsPretty(false)}
              variant={isPretty ? "outlined" : "contained"}
              webTitle={withoutPrettyTitle}
              mobTitle={withoutPrettyTitle}
              icon={<Icon tablerIcon="IconYinYang"/>}
            />

            <Btn
              size="small"
              onClick={e => setIsPretty(true)}
              variant={isPretty ? "contained" : "outlined"}
              webTitle={withPrettyTitle}
              mobTitle={withPrettyTitle}
              icon={<Icon tablerIcon="IconYinYangFilled"/>}
            />
          </ButtonGroup>
        </Grid>
      )}
    </Grid>
  );
};

export default CustomMarkdown;