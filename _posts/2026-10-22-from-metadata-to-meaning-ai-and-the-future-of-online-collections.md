---
image: /images/projects/MCN_AI_Collections.jpg
alt: Title slide of the presentation. Reads 'Art Institute of Chicago, nikhil trivedi, LinkedIn nikhil-trivedi'
link: https://www.youtube.com/watch?v=dkqf2azeSKI
host: YouTube
title: From Metadata to Meaning AI and the Future of Online Collections
dates: October 2026
---
At MCN 2026, I joined a panel of speakers to discuss a pivotal question: how do we thoughtfully evolve our online collection interfaces — and where do we invest first? Do we prioritize AI-powered search? AI-augmented records? Or user-facing conversational features that invite visitors to explore collections on their own terms? Each path carries different implications for trust, accuracy, and long-term sustainability. With my group of panelists we shared real-world collection redesign projects, our frameworks for evaluating AI features and functionality, and our roadmaps for future integration. We also explored what becomes possible when we think beyond institutional boundaries — sharing technical approaches, case studies, and object data across institutions.

<iframe width="560" height="315" src="https://www.youtube.com/embed/dkqf2azeSKI" frameborder="0" allowfullscreen></iframe>


Following were my remarks:

At the Art Institute of Chicago, we’ve had a homegrown collection management system since 1990. This has given us over 35 years to build a really rich trove of scholarly metadata in a single digital source. We describe things like classifications, materials, time periods, and styles really well.

But subject matter isn’t something we’ve invested as heavily in over the years.

Take this painting, for example. It’s a really well-known painting, both to art historians and casual enthusiasts. But few people know the name of the painting or the name of the artist. Our CMS describes this painting as realism, modernism, portrait, fashion. The one tag that gets close to describing its subject matter is “farm life.” Most people actually describe this painting as “man with pitchfork.” They’re not coming to our website looking for this painting typing in “farm life.”  They’re looking for the one with the guy with the pitchfork. And to this day, the word “pitchfork” doesn’t appear anywhere on this artwork page.

So we have gaps in our data. I think subject matter is probably the biggest one, and represents all sorts of opportunities that we're looking at AI to fill.

But we take any decisions to adopt new technology with caution. For one, we’re a relatively small team of engineers—we’re not Netflix—building products we expect to maintain for the long term. Any new technology adds to the overall footprint of what we manage and what we need to support. This forces us to be really thoughtful about technology adoption. We won’t do AI just to do AI, there has to be a compelling reason to do so.

But more importantly, as an organization that’s dedicated to human-created things, we have to be careful about distributing machine-generated material. What we decide to put in front of our visitors is a reflection of who we are, and the entire apparatus of our organization. Letting a machine speak for us is not something we can approach lightly.

Moreover, one of our priorities as engineers is to limit building things that have an immediate integration with any third-party service, including an LLM. Models change, companies will come and go in the coming years, and we don’t want to have to scrap a feature because an integration point has disappeared. Because it does happen, and it sucks when we're put in a bind because of it. So any approach we take with AI uses a strategy of one-time use, and saving generated content long-term so we can build off local data. As LLMs improve, we can rerun a generation process to improve our feature's performance, but we’re not going to build something that will need one specific third-party to just always be around.

With all that in mind, I want to talk today about three uses of AI we have decided to take on at the Art Institute of Chicago:

- Visually similar artworks
- Alt text for publication images
- Semantic search experiment

First, let me give you a sense of our overall architecture. We have an API that aggregates public data from a number of different internal systems and serves it in a uniform format. This includes data on artworks, artists, exhibitions, blog articles, shop products, audio content, videos, and so much more. Our API delivers content to our website, mobile apps, in-gallery interactives, and we’ve made that same API open to the general public. Every type of content in our API also provides a search endpoint powered by Elasticsearch, which is what we’ve used to index vector embeddings that powers some of the experiments I’ll share with you today. A system like this lets us more easily scaffold new experiments with any number of technologies, AI being the latest.

By the end of the year, the engineering team is wrapping up implementation work to redesign the artwork pages on our website. We haven’t touched these pages since we launched the current version of our website in 2018, so this work is long overdue.

One particular area we're revamping is a grid of more artworks to explore based on metadata similarity. In a region called “Most similar”, we aggregate top works that share the same style, classification, artist and time period, and show you 12 similar works based on metadata. This algorithm took a lot of tweaking to get just right, but you'll see it still falls short. Our boy "Man with pitchfork" is tagged with "Realism" and "Oil painting," two quite large umbrellas that leave the results feeling pretty disparate from the work you're looking at.

This one suffers a similar problem, being tagged with "Impressionism" and "Oil on canvas," two really large pools of artworks to pick from.

This work gets closer, but only by the luck of having a style that's represents by a much more limited pool of works.

In our new artwork page design, we’re swapping this metadata-based listing with one based on AI analysis of our images. You’ll see the first one here is a parody of the same work.

We run a one-time script that generates vector embeddings based on the artwork image, stores those embeddings in our Elasticsearch index, and we show you the work’s nearest neighbors to present visual similarity on this page.

It gets us closer to what we had wanted to do with the previous functionality, and is really satisfying to see.

The publications department at the Art Institute of Chicago has been publishing digital scholarly catalogs about our collections and exhibitions since 2014. Originally hosted in the Drupal-based OSCI platform, we’ve since built out tools to publish new digital catalogs on our main website that include the features a reader may expect: tables of contents, paragraph numbers, citations, layered image viewers, and more. Publishing is in the middle of a multi-year migration of catalogs from our old OSCI system into our main website. So on top of their existing publication launch schedule, this means there are a LOT of images being added to our website nowadays, tens of thousands of images from publishing alone. We have an engineer-initiated process to generate alt-text for images of a specific publication and tags them so publishing staff can easily review the alt text we're generating. Asking staff to review vs. create alt text reduces their mental load and allows us to have an adequate review process before we put machine-generated content in front of our users.

Finally, we’ve been working on an experiment to power the search of our collections by a vector search, with an eye towards surfacing more relevant artworks for subject-matter-based searches. So when you search "man with pitchfork," you can more easily find the one with the guy holding a pitchfork. We feel we’ve gotten this hybrid search into a good place that serves casual enthusiasts who may be searching based on subject matter, as well as our scholarly audience who may be searching for things well documented in our metadata. But it took quite an extensive process of reviewing the search performance and iteratively tweaking our logic to get there.

Each time we deployed a change of the search logic to our test environment, our product manager would perform our top 100 most common searches and compare them side-by-side with what we currently have in production, and make a judgment call on whether the results Improved, were Equivalent, or Worse. He did the same thing with 150 subject matter and natural language search queries, 50 queries our curators surfaced early on when we shared a prototype with them, and the 50 most commonly searched artist names. That’s our PM doing 350 searches in test and prod side-by-side and evaluating the results for each one every time we made a change. And we did this 16 times in total with this rigor in place. We had done even more iterations before we got our stuff together. We’d discuss his findings, brainstorm the next iteration, and start over. Here's a peak at where we've landed.

On the left is our current search experience looking solely at metadata for the search “happiness.” Lots of titles with the word "happy" in it, but not really the mood one might expect. On the right are the results of our semantic search. Objectively, these humans are happier.

For the search "moon," our current search again leaves much to be desired. Our semantic search, on the other hand, is very moon-forward

And finally, our boy with the pitchfork. We have works by Man Ray in our collection, so the search for man with pitchfork surfaces his works early. Our semantic search, however, lots of people holding pitchforky things, and our boy's right up there.

In our most recent iteration, we’ve done away with the concept of a purely hybrid search, where we try to combine metadata-based results and vector embedding-based results. We felt our metadata-only search worked REALLY WELL on scholarly searches, and our vector-based search worked really well on subject matter searches. We landed on this: before we execute a search, we run a series of checks to determine whether the search query intends to search our metadata. Depending on the outcome, we run one search or the other. So for example, if a search query contains a functional word, like “with” or “near,” or if any of the words are verbs or adverbs ending in “ing” or “ly” we’ll flag it as a vector search. In another check, we compare the search query with all our styles, artist names, and artwork names, and if the match is over a certain threshold, we’ll flag it as a metadata search. Then we'll perform either a purely vector search, or one that looks at our metadata alone.

As an aggressively slow adopter of new technology, I think we've landed in a good place with our experiments, and look forward to building more.
