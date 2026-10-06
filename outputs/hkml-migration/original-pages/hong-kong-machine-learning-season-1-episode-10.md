# Hong Kong Machine Learning Season 1 Episode 10

Original: https://www.hkml.ai/2019/05/hong-kong-machine-learning-season-1-episode-10/

When?

Wednesday, May 15, 2019 from 7:00 PM to 9:00 PM

Where?

Prime Insight, 3 Lockhart Road, Wan Chai, Hong Kong

This meetup was sponsored by Prime Insight which offered the location, drinks and snacks. Thanks to them, and in particular to Romain Haimez and Matthieu Pirouelle.
[Prime Insight](https://www.primeinsight.com/prime-insight)

## Programme:

Note that, as usual, errors and approximations in the summaries below are mine.

Cheney Cheng from Apoidea.ai - Tipping point of Natural Language Processing and its implication
[Cheney Cheng](https://www.linkedin.com/in/cheneycheng/)
[Apoidea.ai](https://www.apoidea.ai/)

Abstract:

Natural Language Processing (NLP) has been referred as the next revolutionary area after computer vision in the mega AI trend. Especially the Google’s BERT (Bi-directional Encoder Representations for Transformer) published in October 2018 has given the enthusiasts a similar feeling of AlexNet’s ground breaking performance in ImageNet in 2012, which provided superhuman performance in computer vision at the first time and ignited the rocket growth of the AI industry.

Bio:

Cheney, co-founder of Apoidea, an AI-driven financial media company, is going to share the recent development of Natural Language Processing with the help of Deep Learning, and the implication of BERT to NLP researchers and tech entrepreneurs.

Summary:

Cheney emphasized that the AlexNet moment of NLP may have happened, i.e. pre-trained models are good enough for anybody to use efficiently for their own problems at hand. In his opinion, Natural Language Understanding/Processing (NLU/P) applications are even more pervasive than Computer Vision (CV) ones.

Cheney first reviewed the typical tasks that NLP researchers and practitioners have to solve (Cheney’s classification):

I would add to this list: Text Summarization.

Then, he highlighted the different challenges in the NLP field, e.g. limited labelled data, polysemy, knowledge and context based.

Word embeddings, which became popular in 2014, are somewhat good at dealing with the limited labelled data by being estimated on large unlabelled corpuses. However, the first versions (GloVe, Word2Vec) were not able to deal with words polysemy having only one vector associated to each word via a dictionary mapping. Models such as ELMo and BERT (published late 2018) are able to deal with it.

Cheney’s advice to practitioners (and even researchers outside the big Tech companies): Just use and fine-tune BERT to the relevant problems at hand!

His presentation can be found here.
[here](https://drive.google.com/file/d/0B7QQh9_kDYm3Vi1TRmF1VzAzNVV1X3QyRS1wNTlHSkFhdy1N/view?usp=sharing)

Alexandre Gerbeaux from DataRobot - Interpretability
[Alexandre Gerbeaux](https://www.linkedin.com/in/alexandre-gerbeaux-b3807258/)
[DataRobot](https://www.datarobot.com/)

Alexandre is a data scientist at DataRobot, a company focused on democratizing machine learning in a wide spectrum of industries. This is the third time Alexandre talks at the meetup (cf. HKML S1E3 and HKML S1E5 for the two previous presentations). As before, his presentation was a combination of data science intuition, memes, reference to DataRobot features and capabilities as well as very interesting reference to technical literature for further exploration by the meetup members.
[DataRobot](https://www.datarobot.com/)
[HKML S1E3](http://marti.ai/hkml/2018/10/09/hkml-s1e3.html)
[HKML S1E5](http://marti.ai/hkml/2018/12/19/hkml-s1e5.html)

During his talk, he presented a set of model-agnostic explanation tools based on the ideas of:

feature importance (most impactful features)

partial dependence (directionality of the features)

LIME (paper, GitHub repo, video)
[paper](https://arxiv.org/pdf/1602.04938.pdf?mod=article_inline)
[GitHub repo](https://github.com/marcotcr/lime)
[video](https://www.youtube.com/watch?v=hUnRCxnydCc)

SHAP (paper, GitHub repo).
[paper](http://papers.nips.cc/paper/7062-a-unified-approach-to-interpreting-model-predictions.pdf)
[GitHub repo](https://github.com/slundberg/shap)

I will probably investigate further these techniques over the next weekends. To be continued… Since the meetup, I experimented with LIME. Results of my experiments can be found there.
[there](http://marti.ai/ml/2019/05/26/lime-credit-sentiment.html)

Alexandre’s presentation is there.
[there](https://drive.google.com/file/d/0B7QQh9_kDYm3dHJnajFxeWNnckpPX185WUZQWlJOTTk4dG9R/view?usp=sharing)

Yan King Yin - Foundational concepts in AI/AGI, and YKY research

Abstract:

Yan King Yin will present foundational CS/ML notions such as Kolmogorov complexity, VC dimension, automata and Turing Machine, predicate logic: All potential pieces to an artificial general intelligence. He will share his thoughts on how logic and neural networks can be blend together toward the goal of artificial general intelligence (AGI).
[Kolmogorov complexity](https://en.wikipedia.org/wiki/Kolmogorov_complexity)
[VC dimension](https://en.wikipedia.org/wiki/Vapnik%E2%80%93Chervonenkis_dimension)
[Turing Machine](https://en.wikipedia.org/wiki/Turing_machine)

Summary:

YKY’s presentation can be found there.
[there](https://drive.google.com/file/d/1T_Qq_JDANIblZRESpqSViybmuL99HqUd/view?usp=sharing)

During his talk, YKY mentioned Robert Kowalski as inspirational to his work. Kowalski is a logician and computer scientist who approaches artificial intelligence from the logic angle. One can have a look at Computational Logic and Human Thinking: How to be Artificially Intelligent, a book published on the subject.
[Robert Kowalski](https://en.wikipedia.org/wiki/Robert_Kowalski)
[Computational Logic and Human Thinking: How to be Artificially Intelligent](https://www.doc.ic.ac.uk/~rak/papers/newbook.pdf)

It’s important to remember that not so long time ago (1990-2000), logic-based systems were a mainstream view for AI, and that it largely co-exists with machine learning stat-based approached between 2000-2010.

One can have a look at the past proceedings of IJCAI, an international conference on AI. Conferences such as IJCAI (International Joint Conferences on Artificial Intelligence) received most of their contributions from logic researchers, and at that time, it was hard to publish anything neural network related. Nowadays, this conference is flooded by machine learning / deep learning papers (look at proceedings post 2016 - I got a paper published there in 2016, which is purely stat-based), and logic-based approaches are tending to be rare amongst the accepted papers.
[past proceedings of IJCAI](https://www.ijcai.org/past_proceedings)
[IJCAI (International Joint Conferences on Artificial Intelligence)](https://www.ijcai.org/)
[I got a paper published there in 2016, which is purely stat-based](https://www.ijcai.org/Abstract/16/367)

For example, Kowalski got several prizes in AI from AAAI/IJCAI pre-deep learning era:

Kowalski was elected a Fellow of the American Association for Artificial Intelligence in 1991, of the European Co-ordinating Committee for Artificial Intelligence in 1999, and the Association for Computing Machinery in 2001. He received the IJCAI Award for Research Excellence, “for his contributions to logic for knowledge representation and problem solving, including his pioneering work on automated theorem proving and logic programming” in 2011.

Post 2016, it became tough times for AI logicians as the tremendous successes of deep learning, and especially the industrial applications, have diverted the foundings and talents from this area of research. It’s still important that a couple of researchers continue the effort since Machine / Deep Learning is good at some very specific tasks, but it is for now rather shallow AI with no reasoning capabilities.

Thanks to YKY’s talk, I learned about the Soar (cognitive architecture), which is a long standing AI research project (started in 1983). People are still actively developping it today, cf. this GitHub repo, and recent publications.
[Soar (cognitive architecture)](https://en.wikipedia.org/wiki/Soar_(cognitive_architecture))
[this GitHub repo](https://github.com/SoarGroup)
[recent publications](https://soar.eecs.umich.edu/Soar-RelatedResearch)

Gautier Marti - A short introduction to Snorkel
[Gautier Marti](https://www.linkedin.com/in/gautier-marti-344b565a/)

Abstract:

Snorkel is a framework to create large datasets for supervised learning, quickly. It is an example of ‘data programming’, and a building block of “Software 2.0”. In this short presentation, Gautier will explain these terms, and illustrates how the framework works with a small tutorial: a toy sentiment model.

Summary:

Due to lack of time, I only highlighted (in 2 minutes) that Snorkel was an important tool, in my opinion, to enable machine learning in many domains. Impatient readers can have a look at these two blogs I wrote recently: Snorkel sentiment I, Snorkel sentiment II.
[Snorkel sentiment I](http://marti.ai/ml/2019/05/01/snorkel-credit-sentiment-part-1.html)
[Snorkel sentiment II](http://marti.ai/ml/2019/05/04/credit-sentiment-vader.html)

I will do the full talk at a future meetup. Or, maybe another member of the group can do it? Contact me, if interested in doing so.
