# Hong Kong Machine Learning Season 1 Episode 7

Original: https://www.hkml.ai/2019/02/hong-kong-machine-learning-season-1-episode-7/

When?

Wednesday, February 20, 2019 from 7:00 PM to 9:00 PM

Where?

Prime Insight, 3 Lockhart Road, Wan Chai, Hong Kong

This meetup was sponsored by Prime Insight which offered the location, drinks and snacks. Thanks to them, and in particular to Romain Haimez and Matthieu Pirouelle.
[Prime Insight](https://www.primeinsight.com/prime-insight)

## Programme:

Marko Valentin Micic - Hyperbolic Deep Learning for Chinese Natural Language Understanding
[Marko Valentin Micic](https://www.linkedin.com/in/marko-valentin-micic-54442488/)

Recently hyperbolic geometry has proven to be effective in building embeddings that encode hierarchical and entailment information. This makes it particularly suited to modelling the complex asymmetrical relationships between Chinese characters and words. In this paper we first train a large scale hyperboloid skip-gram model on a Chinese corpus, then apply the character embeddings to a downstream hyperbolic Transformer model derived from the principles of gyrovector space for Poincare disk model. In our experiments the character-based Transformer outperformed its word-based Euclidean equivalent. To the best of our knowledge, this is the first time in Chinese NLP that a character-based model outperformed its word-based counterpart, allowing the circumvention of the challenging and domain-dependent task of Chinese Word Segmentation (CWS).

Marko’s paper; His slides for the presentation can be found there.
[paper](https://arxiv.org/abs/1812.10408)
[there](https://drive.google.com/file/d/1Cr9Ec6Od6ar19EWkf8wican_-lmtCEBU/view?usp=sharing)

Though the presentation was quite technical, Marko did a great job at vulgarizing differential geometry and illustrating the concepts. He recommended to visit http://hyperbolicdeeplearning.com/ for a good introduction to the field of hyperbolic deep learning.
[http://hyperbolicdeeplearning.com/](http://hyperbolicdeeplearning.com/)

Ji Ho Park - Exploiting emotion knowledge from emoji and #hashtags
[Ji Ho Park](https://www.linkedin.com/in/parkjiho/)

Grasping other person’s emotions or sentiments through texts is challenging even for humans sometimes. I bet you also have an experience that once you were reading someone’s message multiple times to figure out, “Is he/she upset? Or am I too sensitive?” Despite the difficulties, figuring out emotion or sentiment in texts is crucial nowadays, due to our daily habit of using emails, mobile messengers, social media, chats. An interesting question is, “can we teach machines to understand sentiment and emotions inside our texts?”

Ji Ho and colleagues introduces how to build a sentiment/emotion analysis system by training deep learning models with a huge amount of tweets. They exploit the emotional knowledge inside those texts by using emojis and hashtags as weakly supevised label. Their system ranked Top 3 in SemEval 2018: Affect in Tweets, a well-known competition in the NLP research community.

Ji Ho’s paper. His slides for the presentation can be found there.
[paper](https://arxiv.org/pdf/1804.08280.pdf)
[there](https://drive.google.com/file/d/1TuytTw_-eqWLq7QNJhBCKw-MrcqglDvl/view?usp=sharing)

Ji Ho proposed methods to build embeddings that capture the sentiment associated to a word. Concretely, he uses deep learning architectures that are fitted on tweets to predict an associated emoji. Then, he removes the softmax layer and keeps the rest of the model as an encoder of the sentence. He showed that this approach is very good at capturing nuance in the sentiment, cf. “this is shit” (bad) vs. “this is the shit” (awesome). His research was inspired by the DeepMoji paper, cf. also the associated blog and GitHub.
[DeepMoji paper](https://arxiv.org/pdf/1708.00524.pdf)
[blog](https://www.media.mit.edu/projects/deepmoji/overview/)
[GitHub](https://github.com/bfelbo/DeepMoji)

Guy Freeman - On DataGuru and Hong Kong open data
[Guy Freeman](https://www.linkedin.com/in/guyfreemanstat/)

Guy Freeman is the founder of open data and analytics platform dataguru.hk, as well as a co-founder of d5.ai, a global decentralised data science consultancy. He was previously a data scientist in both startups and corporations in Hong Kong for 8 years, helping businesses create value by improving their data management and analytics processes and solutions. Guy also has extensive research experience in academia, with a PhD in statistics from the University of Warwick in England, followed by a Post-Doctoral Fellowship at the University of Hong Kong’s School of Public Health working on modelling influenza prevalence and experiment design.
[dataguru.hk](https://dataguru.hk/)

Guy talked about open data, the necessity of open data, the benefits of open data, open data in Hong Kong (and data that should be open but isn’t), and a recent example of how he used Hong Kong semi-open data to create truehome.hk.
[truehome.hk](https://truehome.hk/)
