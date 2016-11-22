---
layout: post
title: WTF is Linked Open Data?
created: 1406066365
categories:
- technology
---
I've been hearing about Linked Open Data for years. I've sat in on [sessions](http://www.museumsandtheweb.com/mw2011/session/linked_data.html) at conferences and followed many discussions on [Twitter](https://twitter.com/search?q=%23lodlam) and [e-mail lists](https://groups.google.com/forum/#!forum/lod-lam). At times, the tone of these conversations seemed like "this is such an awesome tool that nobody is using." But I never really understood what it was. I was left still wondering "WTF is Linked Open Data?"

I think I figured it out, at least in a general sense. I'm sharing my discoveries here, so other confused developers can benefit. 

<strong>Relationships</strong>
Databases are really good at storing fielded values, but the ways in which they link entities generally lack meaning. Linked Open Data (LOD) rethinks these connections, because <em>a fundamental idea behind Linked Open Data is to describe how people, places and things relate to each other</em>. 

The way that I've worked with this concept recently has been with noSQL-style RDF triples. Each entity has a collection of relationships described in the following way:

<pre>Thing | relates to | thing</pre>

So for example:

<pre>The Old Guitarist | was created by | Pablo Picasso</pre>

A linked open "database" will consist of a series of these triples describing how various pieces of data are connected to each other ([for](http://dbpedia.org/page/The_Old_Guitarist) [example](http://data.nytimes.com/N855344257183137093)).

<strong>Identifiers</strong>
LOD requires that <em>data sets be shared and mapped to one another to benefit from each other's knowledge bases</em>, because “open” data is "freely available for reuse in practical formats with no licensing requirements” (h/t [Mia Ridge](http://www.miaridge.com/keynote-from-strings-to-things-lodlam-melbourne-workshop)). To do this we must give all our entities permanent identifiers that start with HTTP and are available on the web. These "URL IDs", or URIs, should resolve to the data they represent, making them human- and machine-retrievable. 

If we take the triple format we described above, the example record might look like this:

<pre>http://data.museum.org/assets/The_Old_Guitarist | http://data.museum.org/relations/Created_by | http://data.museum.org/assets/Pablo_Picasso</pre>

Those URIs will resolve to RDF documents describing those things and how they're related to other things, allowing viewers to traverse our collection in many directions to many levels. 

<strong>Namespaces</strong>
RDF provides shorthand for long URIs, so we can define reusable prefixes, or namespaces, to make our triples more readable. 

<pre>@PREFIX musasset http://data.museum.org/assets
@PREFIX musrelation http://data.museum.org/relations

musasset:The_Old_Guitarist | musrelation:Created_by | musasset:Pablo_Picasso</pre>

<strong>Connecting our collections</strong>
“Linked” data means our repositories are not silos but are mapped to one another. Instead of reinventing the wheel, I can create a whole ton of data about artworks, creators and places at my museum connected with an already vetted data set, say [DBpedia](http://wiki.dbpedia.org/Ontology). In this case, my example would now look something like this:

<pre>musasset:The_Old_Guitarist | dbpedia:Created_by | dbpedia:Pablo_Picasso</pre>

With my data connected with existing sets, I could merge my data with other museums and search and browse our combined sets in tandem. For example, I can find works other museums have that were created by Picasso along with ours. I can also link my data to another museum's data in meaningful ways:

<pre>musasset:The_Old_Guitarist | dbpedia:Created_with | othermus:A_specific_blue_oil_paint</pre>

In practice, however, connecting disparate data sets with each other in this flexible way can get tricky. 

What if my museum's notion of that blue paint differs from the other museum's? What if their research yielded different conclusions, so their vocabulary doesn't accurately reflect what we're trying to say? Different institutions' collections can vary tremendously, likewise the ways we describe them. How do we merge our data sets while staying true to our institutional methods for describing our works?

[There](http://dublincore.org/) [are](http://wiki.dbpedia.org/Ontology) <em>[plenty](http://www.cidoc-crm.org/)</em> of standards out there that can help with this challenge. But the more flexible the standard gets, the more convoluted it can be to describe our collections. At the same time, I think it's okay that there will never be one data set that represents all our viewpoints, that we won’t always agree on definitions for the same concepts. Humans have a huge variety of perspectives of our world and our histories, and different vocabularies can and should reflect that variation. 

<strong>A-haaaa!</strong>
So that's what I gather: Linked Open Data is a super-flexible way of describing how data relates to one another, and provides a framework to connect our data sets with each other in meaningful ways. 

<strong>Credit where it's due</strong>
Thanks to [David Henry](https://twitter.com/dhenry314) and [Jarred Moore](https://twitter.com/jarredmoore) from the Missouri History Museum for a [workshop](http://mw2014.museumsandtheweb.com/proposals/an-introduction-to-linked-open-data-for-museums/) they facilitated on Linked Open Data at Museums and the Web 2014. Thanks to [Mia Ridge](https://twitter.com/mia_out) for her feedback and keeping [#lodlam](http://lodlam.net/) on my radar (check out a similar, more thorough overview [she wrote](http://www.miaridge.com/keynote-from-strings-to-things-lodlam-melbourne-workshop) two years ago). Thanks to [Micah](https://twitter.com/micahwalter) and [Kyle](https://twitter.com/kjaebker) for asking me to share what I've figure out.

