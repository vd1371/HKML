# Hong Kong Machine Learning Season 2 Episode 6

Original: https://www.hkml.ai/2020/05/hong-kong-machine-learning-season-2-episode-6/

When?

Wednesday, May 13, 2020 from 7:00 PM to 9:00 PM

Where?

At your home, on zoom. All meetups will be online as long as this COVID-19 crisis is not over.
[zoom](https://zoom.us/)

Thanks to our patrons for supporting the meetup!

Check the patreon page to join the current list:
[Check the patreon page](https://www.patreon.com/hkml?fan_landing=true)

Tomas Thornquist
[Tomas Thornquist](https://www.linkedin.com/in/tomas-thornquist-060a43122/)

## Programme:

Pranav A - 2kenize: Tying Subword Sequences for Chinese Script Conversion
[Pranav A](https://www.linkedin.com/in/pranav-a-415741166/)

Pranav A will be presenting his recently accepted ACL 2020 paper (co-authored with Isabelle Augenstein). This paper explores some major issues in Chinese NLP and provides some interesting insights and solutions to tokenization, script conversion and topic classification problems. You can read the arXiv preprint here: https://arxiv.org/abs/2005.03375.
[ACL 2020](https://acl2020.org/)
[Isabelle Augenstein](https://www.linkedin.com/in/isabelle-augenstein-82436b7a/)
[https://arxiv.org/abs/2005.03375](https://arxiv.org/abs/2005.03375)

If you are interested in NLP, or want to pursue NLP projects, or need some NLP advice, then contact him. You can also find him on Twitter at pranav_nlp.

His presentation (in two parts) can be found here for part I, and here for part II.
[here for part I](https://docs.google.com/presentation/d/1Fcte9eJ8FBdvzQyp10uQBAUF0z4neQ8mIRKg00puk9o/edit#slide=id.gcb9a0b074_1_0)
[here for part II](https://docs.google.com/presentation/d/15rMlJ4If-COPfx0G9HfQ4UL8JtO6AE_03Oa7mcZBVlE/edit#slide=id.p)

Personal takeaways

Part I:

Tokenization in Chinese NLP is non trivial: no whitespaces, where to cut the sequence of characters? There are tools like Jieba which performs word segmentation, but they are not perfect. Subword tokenization can be a solution (and is actually employed in many language models such as BERT).

OpenCC, a tool used by Wikipedia to convert between Simplified and Traditional Chinese.
[OpenCC](https://github.com/BYVoid/OpenCC)

An example of word segmentation with dynamic programming (memoization).

Part II:

Script conversion task has pitfalls: simplified characters can have one-to-many mappings to traditional characters.

Available script converters far from perfect.

The approach proposed by Pranav is to segment Simplified Chinese (SC) and Traditional Chinese (TC) altogether, hence the naming 2kenize! Good one :) More precisely, from an initial SC sentence possible TC sequences using mappings are generated. These possible TC sequences are fed to a Viterbi (dynamic programing algorithm) that calls recursively the language model (here an LSTM) which is used as a scoring function. As a final output, one gets the converted TC sequence.

Then, Pranav detailed a couple of tweaks he did to a typical language model (e.g. input a truncated sentence instead of the whole sentence).

The final model outperforms by a margin all available approaches.

Besides the model, Pranav provides several experiments (error analysis, ablation analysis, 1kenize (his model simplified to run only on TC)) and datasets associated to his research work. Soon available on the dedicated GitHub repo.
[GitHub repo](https://github.com/pranav-ust/2kenize)

The approach seems to work particularly well for code mixing (both SC and TC) and named entities.

Finally, a shout out for the company he is working for which is looking for a Computer Vision engineer.
[company](https://dayta.ai/)

Alexandre Gerbeaux and Puneet Goyal - Problem Framing in Machine Learning
[Alexandre Gerbeaux](https://www.linkedin.com/in/alexandre-gerbeaux-b3807258/)
[Puneet Goyal](https://www.linkedin.com/in/puneetgl/)

Alexandre is a regular at the Meetups, he is not at his first presentation here. With Puneet, they went through a DataRobot - the unicorn AutoML company - presentation: The Art of Creating a Target Variable in Predictive Modeling which you can find here. The content was more targeted toward practitioners having to solve business problems. They took the task of predicting churn as an example (and probably a frequent use case of their clients).
[DataRobot](https://drive.google.com/file/d/16IxF-6XVaOEP4f8HEaBjk4qOtchsJjDK/view?usp=sharing)
[here](https://drive.google.com/file/d/1SPNPc7VPBs2rfOUPid4xyWsJiVAIQlAn/view?usp=sharing)

The key takeaways:

Target creation is often overlooked (too strong focus on feature engineering and model selection, and that is exactly what DataRobot automates)

Different ways to define the targets, and various impacts on the end results

(maybe less relevant to the pure Machine Learning dude) as a business, what actions (or lack thereof) to take based on the predictions and the costs attached to them

as in many cases the horizon of the look-back window is ill-defined, the advice given is to experiment with several different look-back windows, and maybe combine their results (somewhat unsatisfying)

domain knowledge is required to use the relevant features, and to formulate the relevant target (there lies the added value from a business perspective, as DataRobot is supposed to take care of the rest)
