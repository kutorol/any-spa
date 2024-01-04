import { Grid, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import * as React from "react";
import { SiteEmailSupport, SiteInn } from "../../../../../store/constant";
import Icon from "../../../Gui/Common/Icon";

const DocumentAgreementEN = () => {
  const dot = <Icon tablerIcon="IconPointFilled" size="1rem"/>;

  const titles = [
    "full name",
    "place of residence (country, region, city)",
    "phone numbers",
    "email addresses (E-mail)",
    "date of birth",
    "time zone",
    "gender",
    "language",
    "avatar",
    "hobbies and interests",
    "area of professional activity",
    "information about the User's acquisition source"
  ];

  const titles2 = [
    "collection and accumulation",
    "storage for the period established by regulatory documents for financial reporting, but not less than 5 (five) years from the date of the User's cessation of using the Site's services",
    "clarification (updating, modification)",
    "use for the purposes specified in this agreement",
    "destruction / anonymization",
    "transfer to third parties for the purpose of fulfilling obligations under the contract with the User, ensuring the protection of personal data from unauthorized access, and at the request of state authorities."
  ];

  const analyticServices = {
    "Yandex.Metrica": "https://metrika.yandex.com",
    "Google Analytics": "https://analytics.google.com",
    "Segment.com": "https://segment.com",
    "VKontakte": "https://vk.com"
  };

  const sx = { mb: 2 };
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sx={{ mb: 1, "&": { paddingLeft: "0 !important;" } }}
      >
        <Grid container>
          <Grid item xs={12} sx={{ mb: 1 }}>
            {/* @ts-ignore */}
            <Grid container align="center">
              <Grid item xs={12} sx={{ mb: 1 }}>
                <Typography variant="h3">
                  AGREEMENT
                </Typography>
                <Typography variant="h4">
                  on the processing of personal data
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2">05.11.2023</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          "& .MuiGrid-root, & .MuiTypography-root": {
            textAlign: "justify"
          }
        }}
      >
        <Grid item xs={12} sx={sx}>
          <Typography variant="body2">
            By joining this Agreement and providing their data on the website (hereinafter referred to as the "Site"),
            whose operator is Dmitriev Nikolay Dmitrievich, acting under the legislation of the Russian Federation,
            being a tax resident of the Russian Federation (TIN: {SiteInn}) (hereinafter referred to as the "Operator"),
            providing additional paid services, by filling in the fields of the online application (registration),
            the user (hereinafter referred to as the "User"):
          </Typography>
        </Grid>

        <Grid item xs={12} sx={sx}>
          <List dense>
            <ListItem>
              <ListItemIcon>
                {dot}
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  confirms that the data provided by them, including personal data, belongs to
                  them personally and/or to an incapacitated person, the legal representative of whom is
                  the user;
                </Typography>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                {dot}
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  acknowledges and confirms that they have carefully and fully read
                  this Agreement and the terms of processing their personal
                  data contained in it, specified in the fields of the online application (registration) on the Site;
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                {dot}
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  acknowledges and confirms that all provisions of this Agreement and the terms
                  of processing their personal data are clear to them;
                </Typography>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                {dot}
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  gives the Operator consent to process the provided data, including
                  personal data, for the purposes of User registration on the Site and other purposes specified in
                  the Agreement.
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} sx={sx}>
          <Typography variant="body2">
            The User gives their consent to the processing of their data, including personal data, namely, the
            performance of actions provided for in clause 3 part 1 of Article 3 of Federal Law of 27.07.2006 No. 152-FZ
            "On Personal Data": any actions (operations) or a combination of actions (operations) performed using
            automation tools or without using such tools with personal data, including collection, recording,
            systematization, accumulation, storage, clarification (updating, changing), extraction, use, transfer
            (distribution, provision, access), anonymization, blocking, deletion, destruction of personal data), and
            confirms that by giving such consent, they act freely, voluntarily, and in their own interests or in the
            interests of the legally represented incapacitated person.
            The User's consent to the processing of their data is specific, informed, and conscious.
            The User's personal data is processed for the purpose of registering the User on the Site and providing the
            User with additional paid services, conducting marketing promotions by the Operator, interacting with
            potential clients, compiling analytical reports, as well as sending birthday greetings and other
            communications between the Operator and the User.
            The consent applies to the processing of the following User data, including personal data:
          </Typography>
        </Grid>

        <Grid item xs={12} sx={sx}>
          <List dense>
            {titles.map((t, i) => (
              <ListItem key={i}>
                <ListItemIcon>
                  {dot}
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2">
                    {t}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} sx={sx}>
          <Typography variant="body2">
            Additionally, the Site collects and processes anonymized data about visitors (e.g., "cookie" files) using
            Internet statistical services:
          </Typography>
        </Grid>

        <Grid item xs={12} sx={sx}>
          <List dense>
            {Object.keys(analyticServices).map((name, i) => (
              <ListItem key={i}>
                <ListItemIcon>
                  {dot}
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2">
                    {name} <Link underline="hover" href={analyticServices[name]}
                                 target="_blank">{analyticServices[name]}</Link>
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} sx={sx}>
          <Typography variant="body2">
            The User grants the Operator the right to perform the following actions (operations) with personal and other
            data:
          </Typography>
        </Grid>

        <Grid item xs={12} sx={sx}>
          <List dense>
            {titles2.map((t, i) => (
              <ListItem key={i}>
                <ListItemIcon>
                  {dot}
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2">
                    {t}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} sx={sx}>
          <Typography variant="body2">
            Data security is ensured by implementing legal, organizational, and technical measures necessary to fully
            comply with the requirements of current legislation in the field of personal data protection. The site
            ensures the integrity of the provided data and takes all possible measures to prevent unauthorized access to
            the data.
          </Typography>
        </Grid>

        <Grid item xs={12} sx={sx}>
          <Typography variant="body2">
            The target audience making decisions about the services provided by the Operator consists of adults;
            however, there may be cases where a person who has not reached the age of majority decides to familiarize
            themselves with the services on the site or purchase corresponding services. In cases where the Operator is
            aware that the User is a person who has not reached the age of majority as provided by current legislation,
            the Operator does not process the User's Personal data unless the legal representatives of the minor have
            knowingly provided consent to the processing of the Personal data of such person.
          </Typography>
        </Grid>

        <Grid item xs={12} sx={sx}>
          <Typography variant="body2">
            The mentioned consent is valid for the entire period of using the site and the existence of the personal
            account from the moment of data provision and can be revoked by the User by submitting a corresponding
            statement. The withdrawal of consent to the processing of personal and other data, as well as requests for
            clarification of data or their complete or partial deletion, can be made by the User by sending a
            corresponding statement in a simple written form to the email address: <Link underline="hover"
                                                                                         href={`mailto:${SiteEmailSupport}`}
                                                                                         target="_blank">{SiteEmailSupport}</Link>.
            The User also has the right to familiarize themselves with the list of their personal data processed by the
            Operator by sending a statement to the above-mentioned email address.
          </Typography>
        </Grid>

        <Grid item xs={12} sx={sx}>
          <Typography variant="body2">
            The Operator has the right to make changes to this Agreement. When changes are made, the date of the last
            update is indicated in the current version. The new version of the Agreement comes into effect from the
            moment of its publication unless otherwise provided by the new version of the Agreement.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DocumentAgreementEN;