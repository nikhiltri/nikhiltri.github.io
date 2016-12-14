---
redirect_from: /creating-raisers-edge-api
layout: post
title: Creating a Raiser's Edge API
tags:
- raiser's edge
- drupal
---
About a year ago, a colleagues asked the question: how can I access our Development department's Raiser's Edge data remotely? He was developing an [iPhone app](https://itunes.apple.com/us/app/digital-member-card/id537344043?mt=8) that needed access to our museum's membership data and didn't have a way to do so. To solve the problem we set up a nightly process to export a slice of our member data and import it into a simple Drupal 7 site that we set up to act as a SOAP server. Documented here is how we put the solution together.    

### Technical Strategy
For a simple SOAP application, Drupal is a pretty over-engineered solution. It's not lightweight and runs with more overhead than needed, compared to other PHP development we've done using the [Yii framework](http://www.yiiframework.com/). But we chose Drupal for a few reasons. First, we wanted a web interface for users in the Development department to view the data we're serving. We also wanted a framework to grow within, in case the demands of the system increased after implementation. Since Drupal offers flexibility in viewing data, and has constantly growing system functionality by its large community of developers, Drupal was a clear choice. 

Why SOAP? In recent years REST has proven to be a reliable, quick and lightweight solution for providing remote data. We chose SOAP because of our history and familiarity with the technology. If we were to take on this project today, we would consider REST more closely. 

### Export from Raiser's Edge
Our data requirements were fairly basic. We needed to verify the identify of a member, then provide their name along with one or two related fields. The security demands of the data we're providing is low as we're not returning email or postal addresses, financial information or any other private data. Our Raiser's Edge developers set up a flat export of all our members with the needed data to be exported once a night which drops it in a place the Drupal site can access. 

### Import the data into Drupal
The process of importing a flat-file should be simple, but there were a few hurdles we jumped over along the way. We first scheduled the import using Drupal's built-in cron via the Feeds module. We found that the import ran every time Drupal's cron ran--every hour--even though we specified otherwise in Feeds' settings. We tried separating the import out of the Feeds module, but still found it was running every hour. Looking back, we missed a [piece of code](https://drupal.org/node/827118) needed to specify how often a particular hook_cron method should run. We eventually rewrote the import as a standalone script called by the system cron, which was more reliable and reduced the overhead of the import as well. If we were to revisit the task, we might have looked into the [Migrate](https://drupal.org/project/migrate) module as an alternative to Feeds before writing a standalone script.

One other hurdle that we jumped was how we stored the field data. We saved each member as a node, so the data could sit nicely in Drupal's ecosystem. By default, Drupal stores each field in a separate table. For a large volume of flat data, this caused way more SQL queries to be called on insert, delete and select than necessary, which slowed down each of these processes tremendously. We [ restructured the field data to be stored in a single table](http://stackoverflow.com/a/7662712), which sped things up considerably. 

### Serving Drupal data via SOAP
We used the [SOAP server contrib module](https://drupal.org/project/services) to set up a server with one query method--pass an ID and an identity validate, and get back some member metadata. The admin interface for this module is pretty bare-bones, but had everything we needed for our simple needs. 

We added a few security measures to our query method to stave off scripted attempts to access our data en masse. Each request sleeps for a short time before returning the result. Each failed attempt logs the the requester's IP address, and blocks requests for period of time after a certain number of failed attempts. 

Today, our member card mobile app is available on [iOS](https://itunes.apple.com/us/app/digital-member-card/id537344043?mt=8) and [Android](https://play.google.com/store/apps/details?id=edu.artic.digitalmembercard) and allows users to use their phones in place of their plastic member cards. We also have a mechanism for any application in our ecosystem to link its users with a member of our museum. These are big wins for us, that provide our members greater convenience when visiting our museum, and provided us greater access to a wider range of user data.

