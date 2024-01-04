import { Container, Grid, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import * as React from "react";
import { termOfUseURL } from "../../../../../routes/Components/SpecialRoutes";
import { SiteEmailSupport, SiteInn } from "../../../../../store/constant";
import Icon from "../../../../Common/Gui/Common/Icon";
import CurrenSiteLink from "../../../../Common/Gui/Link/CurrenSiteLink";

const TermOfUseEN = () => {
  const sx = { mb: 2 };
  const dot = <Icon tablerIcon="IconPointFilled" size="1rem"/>;
  const siteLinkTSX = <CurrenSiteLink/>;
  const currentURLLink = <CurrenSiteLink path={termOfUseURL}/>;

  const chapter1 = [
    "This Agreement is governed by the legislation of the Russian Federation.",
    (<>This Agreement with the Licensee (including all amendments and modifications thereto) constitutes the entire
      agreement between the Licensee and the Operator regarding the Site and Site Services and replaces all prior and
      current oral and written communications, proposals, and statements regarding the site service or any other matter
      covered by this Agreement.</>),
    "If any provision of this Agreement with the Licensee becomes invalid, void, or unenforceable, the remaining provisions shall remain in full force and effect.",
    "This Agreement may be amended and/or supplemented by the Operator unilaterally without any special notice.",
    "This Agreement is an open and publicly available document in accordance with Article 435 of the Civil Code of the Russian Federation.",
    (<>The current version of the Agreement is available on the Internet at {currentURLLink}. If the User continues to
      use the Site, he confirms his agreement with the changes made to the Agreement. The User is solely responsible for
      regularly reviewing this page to familiarize himself with the current version of the Agreement.</>),
    "The Agreement also applies to relationships related to the rights and interests of third parties who are not Users of the Site but whose rights and interests may be affected by the actions of Site Users."
  ];

  const chapter2 = [
    "The Operator grants the Licensee the right to use the Site and Site Services in the scope and on the terms set forth in this Agreement. All conditions stipulated below apply to both the Site as a whole and to all its components individually.",
    "Exclusive rights to the Site and Site Services, including accompanying printed materials and any copies, any integrated graphics, photos, texts, video files, audiovisual works, games, additional programs, as well as other copyrighted objects, belong to the Operator and are retained by him after the conclusion of this Agreement."
  ];

  const chapter3 = [
    "The amount of remuneration for using the Site and Site Services is determined based on the tariffs published on the website.",
    "Payment of remuneration is made by the Licensee on the terms defined by the tariffs published on the website. Individuals and legal entities can make payments using the methods specified on the website.",
    "The Operator monitors the Licensee's use of the Site and Site Services and debits the amounts corresponding to the usage tariffs from the received remuneration.",
    "The date of payment is considered to be the date of receipt of funds to the Operator's settlement account.",
    "All payments under the Agreement are made in a non-cash manner using any convenient method offered on the Site.",
    "From the moment of starting to use the Site and Site Services under the granted license, funds paid by the Licensee for the license in the billing period are non-refundable.",
    "In case of insufficient funds received to provide the license, the license is not provided until it is fully paid. In this case, the Operator may send an electronic message to the Licensee at the registered email address notifying the need for additional payment."
  ];

  const chapter4 = [
    "This Agreement enters into force from the moment it is accepted by the Licensee, as defined by the terms of this Agreement.",
    "The term of the Agreement is determined based on the tariff chosen by the Licensee, published on the Site.",
    "The Operator has the right to unilaterally refuse to perform this Agreement out of court in case of Licensee's breach of the Agreement's terms.",
    "In case of termination of the Agreement for any reason, the parties are not obliged to return to each other everything executed and not executed under it until the moment of its termination."
  ];

  const chapter5 = [
    "Under this Agreement, the Licensee is granted a non-exclusive right (simple license) to use the Site and Site Services for their intended purpose.",
    "Copying accompanying printed and electronic materials of the Site, individual elements, or the entire Site is prohibited.",
    (<>Access to the Site and Site Services is provided to the Licensee on the server {siteLinkTSX}. Access to the Site
      is carried out through an Internet browser via the Internet.</>)
  ];

  const chapter6_1 = {
    1: "Not to disclose and not to transfer to third parties their identification data, which allows the Licensee to be authorized on the Site.",
    2: "Use the Site only within the rights and in the ways provided by this Agreement.",
    3: "Not to enter into sublicense agreements in accordance with Article 1238 of the Civil Code of the Russian Federation.",
    4: "Correctly complete the registration procedure on the Site.",
    5: "Not to violate the exclusive (copyright) and non-exclusive rights and other legitimate interests of the Operator, not to copy and not to transfer to third parties any substantial part of the informational content of the Site.",
    6: "Independently familiarize themselves with this Agreement, as well as with possible changes and additions to it, which are posted by the Operator on the pages of the Site.",
    7: "Independently provide the technical possibility of using the Site and Site Services on their part, such as access to the Internet, the presence of software compatible with information transmission via the http protocol, and other necessary means.",
    8: "Keep confidential the login and password that identify the Licensee as the owner of the personal account.",
    9: "The Licensee (User) who provided their email address (E-mail) during registration on the Site and Site Services, as well as during the use of the Site and Site Services, unequivocally confirms thereby their consent to receive informational mailings (letters) from the Operator, Site, and Site Services.",
    10: "Hereby, the parties have established that the Licensee is exempt from the obligation to provide the Operator with a report on the use of the Site and Site Services."
  };

  const chapter6_2 = {
    11: "Provide the Licensee with the opportunity to use the Site and Site Services in accordance with the terms of this Agreement."
  };

  const chapter7 = [
    "In all cases of non-performance of obligations under this Agreement, the parties are liable in accordance with the legislation of the Russian Federation, including, but not limited to, liability provided for by Article 1253 of the Civil Code of the Russian Federation.",
    "After the expiration of the term of the Agreement or in case of its early termination, the Licensee must immediately cease using the Site and Site Services. In case of non-termination of the use of the Site and Site Services, the Licensee must compensate the Operator for direct losses and lost profits incurred by the Operator due to unauthorized use, from the moment of termination of the Agreement until the actual termination of the use of the Site and Site Services by the Licensee.",
    "The Operator is not responsible for:"
  ];

  const chapter7_1 = [
    "Any actions of the Licensee related to the use of the granted rights to use the Site and Site Services;",
    "Any damages suffered by the Licensee due to the loss and/or disclosure of their data necessary for access to the Site;",
    "The quality of the Site Services due to technical malfunctions of the Site or Site updates."
  ];

  const chapter8 = [
    "The parties are released from liability for non-performance or improper performance of obligations under the Agreement if proper performance becomes impossible due to force majeure, i.e., extraordinary and unavoidable circumstances under the given conditions, including: actions of authorities, civil unrest, epidemics, blockade, embargo, earthquakes, floods, fires, or other natural disasters.",
    "In the event of the occurrence of these circumstances, the Party is obliged to notify the other party within 5 (five) business days.",
    "A document issued by an authorized state body is sufficient confirmation of the existence and duration of force majeure circumstances.",
    "If force majeure circumstances continue to exist for more than 30 (thirty) calendar days, each party has the right to unilaterally terminate the Agreement."
  ];

  const chapter9 = [
    "All disputes related to the conclusion, interpretation, performance, and termination of the Agreement will be resolved by the parties through negotiations.",
    "Claims of the Licensee regarding the operation of the Site and Site Services are accepted and considered by the Operator only in writing.",
    "In case of failure to resolve disagreements in the pre-trial procedure, as well as in case of not receiving a response to the claim, the dispute may be referred to court in accordance with the legislation of the Russian Federation."
  ];

  return (
    <Container component="main" sx={{ p: 4, pr: 1.5 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{ mb: 3, "&": { paddingLeft: "0 !important;" } }}
        >
          <Grid container>
            <Grid item xs={12} sx={{ mb: 1 }}>
              {/* @ts-ignore */}
              <Grid container align="center">
                <Grid item xs={12} sx={{ mb: 1 }}>
                  <Typography variant="h1">
                    License Agreement
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2">Version #1 dated 05.11.2023</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            "& .MuiTypography-body2": {
              textAlign: "justify"
            }
          }}
        >
          <Grid item xs={12} sx={sx}>
            <Typography variant="body2">
              <b>
                If you use the provided site {siteLinkTSX}, you accept the granted right for the functional use of
                the {siteLinkTSX} site and confirm your agreement to comply with the terms of this "public license
                agreement - offer for the provision of rights to computer programs and databases."
              </b>
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ mb: 4 }}>
            <Typography variant="body2">
              <b>
                This document "PUBLIC LICENSE AGREEMENT - OFFER FOR THE PROVISION OF RIGHTS TO COMPUTER PROGRAMS AND
                DATABASES" is an offer from Dmitryev Nikolay Dmitryevich (hereinafter referred to as the "Operator") to
                conclude a "PUBLIC LICENSE AGREEMENT - OFFER FOR THE PROVISION OF RIGHTS TO COMPUTER PROGRAMS AND
                DATABASES" with any interested individual or legal entity on the conditions set forth below.
              </b>
            </Typography>
          </Grid>

          {/* @ts-ignore */}
          <Grid item xs={12} sx={sx} align="center">
            <Typography variant="h4">
              PUBLIC LICENSE AGREEMENT - OFFER FOR THE PROVISION OF RIGHTS TO COMPUTER PROGRAMS AND DATABASES
            </Typography>
          </Grid>


          {/* @ts-ignore */}
          <Grid item xs={12} sx={{ mb: 3 }} align="center">
            <Typography variant="h4">
              TERMS AND DEFINITIONS
            </Typography>
          </Grid>


          <Grid item xs={12} sx={sx}>
            <Typography variant="body2">
              <b>Website</b> – a logically connected set of web pages presented in an objective form, as well as an
              automated information system available on the Internet at {siteLinkTSX}.
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <Typography variant="body2">
              <b>Site Services (Computer Programs and Databases)</b> – all the content of the Site (collections of
              databases, computer programs, and commands used to achieve a specific result, including preparatory
              materials developed during the creation of the specified set and generated by it video and audiovisual
              displays).
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <Typography variant="body2">
              <b>Rights Holder, Operator</b> – the owner of the exclusive right to the Site and the exclusive right to
              all Site Services – Dmitryev Nikolay Dmitryevich, who has entered into this "PUBLIC LICENSE AGREEMENT –
              OFFER TO PROVIDE RIGHTS TO COMPUTER PROGRAMS AND DATABASES" (hereinafter referred to as the "Agreement")
              with the Licensee for the right to use the Site and Site Services.
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <Typography variant="body2">
              <b>User, Licensee</b> – a legal or natural person who has entered into this Agreement with the Operator
              for the right to use the Site and Site Services, with the Operator retaining the right to grant licenses
              to other persons (a simple (non-exclusive) license). The Licensee is not entitled to sublicense to third
              parties under this Agreement.
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <Typography variant="body2">
              <b>Offer</b> – a public offer of the Operator addressed to an unlimited number of persons to conclude an
              Agreement containing all essential conditions. The Operator's offer is considered accepted by the
              Licensee, and the Agreement is considered concluded and entered into force at the moment of payment by the
              Licensee for the right to use the Site and Site Services.
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <Typography variant="body2">
              <b>Reward</b> – the amount of money paid by the Licensee for the use of the Site and Site Services, the
              calculation of which is determined based on the tariffs published on the website.
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <Typography variant="body2">
              <b>Authorization Data</b> – data necessary for the identification of the Licensee and the conclusion of
              the Agreement.
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <Typography variant="body2">
              <b>Login and Password</b> – two sets of characters that the Licensee must establish for his personal
              identification and access to the Site and Site Services that require registration. The Login identifies
              the User, and the Password allows the User to access the Site and Site Services.
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <Typography variant="body2">
              <b>Demo Version</b> – a version of the Site Service with a time and volume restriction on its use,
              intended solely for the User's independent familiarization, evaluation, and verification of the functional
              capabilities of the Site Service.
            </Typography>
          </Grid>

          {/* @ts-ignore */}
          <Grid item xs={12} sx={{ ...sx, mt: 3 }} align="center">
            <Typography variant="h4">
              SECTION 1. APPLICABLE LEGISLATION
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <List dense>
              {chapter1.map((t, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    1.{i + 1}.
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

          {/* @ts-ignore */}
          <Grid item xs={12} sx={sx} align="center">
            <Typography variant="h4">
              SECTION 2. SUBJECT OF THE AGREEMENT
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <List dense>
              {chapter2.map((t, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    2.{i + 1}.
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

          {/* @ts-ignore */}
          <Grid item xs={12} sx={sx} align="center">
            <Typography variant="h4">
              SECTION 3. COMPENSATION AMOUNT (PAYMENT FOR THE USE OF THE SITE AND SITE SERVICES)
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <List dense>
              {chapter3.map((t, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    3.{i + 1}.
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

          {/* @ts-ignore */}
          <Grid item xs={12} sx={sx} align="center">
            <Typography variant="h4">
              SECTION 4. TERM OF THE AGREEMENT
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <List dense>
              {chapter4.map((t, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    4.{i + 1}.
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

          {/* @ts-ignore */}
          <Grid item xs={12} sx={sx} align="center">
            <Typography variant="h4">
              SECTION 5. PROCEDURE FOR USING THE SITE AND SITE SERVICES
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <List dense>
              {chapter5.map((t, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    5.{i + 1}.
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

          {/* @ts-ignore */}
          <Grid item xs={12} sx={sx} align="center">
            <Typography variant="h4">
              SECTION 6. OBLIGATIONS OF THE PARTIES
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <Typography variant="body2">
              <b>Licensee shall:</b>
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <List dense>
              {Object.keys(chapter6_1).map((k, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    6.{k}.
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2">
                      {chapter6_1[k]}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <Typography variant="body2">
              <b>Operator shall:</b>
            </Typography>
          </Grid>


          <Grid item xs={12} sx={sx}>
            <List dense>
              {Object.keys(chapter6_2).map((k, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    6.{k}.
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2">
                      {chapter6_2[k]}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>


          {/* @ts-ignore */}
          <Grid item xs={12} sx={sx} align="center">
            <Typography variant="h4">
              SECTION 7. LIABILITY OF THE PARTIES
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <List dense>
              {chapter7.map((t, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    7.{i + 1}.
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
            <List dense sx={{ ml: 4 }}>
              {chapter7_1.map((t, i) => (
                <ListItem key={i}>
                  <ListItemIcon>{dot}</ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2">{t}</Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* @ts-ignore */}
          <Grid item xs={12} sx={sx} align="center">
            <Typography variant="h4">
              SECTION 8. FORCE MAJEURE
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <List dense>
              {chapter8.map((t, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    8.{i + 1}.
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

          {/* @ts-ignore */}
          <Grid item xs={12} sx={sx} align="center">
            <Typography variant="h4">
              SECTION 9. DISPUTE RESOLUTION
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <List dense>
              {chapter9.map((t, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    9.{i + 1}.
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

          {/* @ts-ignore */}
          <Grid item xs={12} sx={sx} align="center">
            <Typography variant="h4">
              SECTION 10. MISCELLANEOUS TERMS
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  10.1.
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2">
                    All matters not covered by this Agreement shall be governed by the current legislation of the
                    Russian Federation.
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>

          {/* @ts-ignore */}
          <Grid item xs={12} sx={sx} align="center">
            <Typography variant="h4">
              SECTION 11. OPERATOR INFORMATION
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <Typography variant="body2">
              <b>Operator:</b> Dmitriev Nikolay Dmitrievich
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <Typography variant="body2">
              <b>TIN:</b> {SiteInn}
            </Typography>
          </Grid>

          <Grid item xs={12} sx={sx}>
            <Typography variant="body2">
              <b>E-mail:</b> <Link underline="hover" href={`mailto:${SiteEmailSupport}`}
                                   target="_blank">{SiteEmailSupport}</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TermOfUseEN;