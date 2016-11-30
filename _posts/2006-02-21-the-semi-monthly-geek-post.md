---
layout: post
title: The semi-monthly geek post
created: 1140561600
tags:
- technology
---
So I’m at my new job, and it's going well. I’m totally geeking out though on trying to use some of the new tools that have come out over the past few years to make my job EASIER. There’s a bunch of cool stuff out there I can use to generate 80% of the code that I would need to write for this project, so I’ve been trying to get those working and synched up together, so I can start doing the more fun stuff. This is what I’ve been using:

Visio--Believe it or not (I’m walking on air) Visio’s got a version of their software that you can use to make database diagrams, AND either connect to the database directly to run all the DDL commands to create and alter the database, or generate DDL code for you. So I can map out the data visually, then “click a button” to set the actual database up for me. Sweeeeeeeet.

[Middlegen](https://sourceforge.net/projects/middlegen/)--Based on the database layout I set up, Middlegen can automatically create my basic Java objects for me, so I don’t have to spend a week or two writing basic getters and setters. Sweeeeeeeet.

[Hibernate](http://www.hibernate.org/)--On the last project I worked on, a big bulk of the code that we had to write was a layer of Java code that linked the Java environment with the database environment. Hibernate is a package that does all that for me. So hopefully, I won’t have to spend WEEKS or MONTHS writing SQL code embedded in Java methods... In addition, I can use Middlegen to automatically generate some of the XML code I need to write to use Hibernate. Sweeeeeeeeet.

[SOAP](http://ws.apache.org/)--I’ll be getting info from the client in the form of an XML document via a SOAP message. After I parse that information into the Java layer, that means I could potentially receive a SOAP message from anywhere--any application, via the web, or a mobile device, or hell, even a washing machine.

[JUnit](http://www.junit.org/)--J-j-j-J-j-j-J-j-J-unIIT. I know, I had to... I’ve been using JUnit to develop redundant tests as I go, and I’ve set these test to run every night. So if one of my code changes totally mucks things up, hopefully I’ll know about it sooner than later.

So that’s what I’m starting to use right now. At this point, everything’s looking pretty sweeet on paper. We’ll see how this stuff actually ends up coming together... Word.

