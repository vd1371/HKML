# Hong Kong Machine Learning Season 1 Episode 3

Original: https://www.hkml.ai/2018/10/hong-kong-machine-learning-season-1-episode-3/

When?

Tuesday, October 9, 2018 from 6:00 PM to 8:00 PM

Where?

WeWork Taikoo Wan Rd 21/F, Cityplaza Three 14 Taikoo Wan Road, Taikoo Hong Kong
[WeWork Taikoo Wan Rd](https://www.wework.com/sv-SE/buildings/14-taikoo-wan-rd--hong-kong--china)

## Programme:

Mathis Antony
[Mathis Antony](https://www.linkedin.com/in/mathisantony/)

Abstract: Making the results of a machine learning project easily reproducible is often no easy feat. We have to work with (or against) OS and language level package managers as well as constantly evolving library APIs and hardware drivers. With the nix package manager it is possible to unambiguously specify the entire dependency tree of your projects on Linux distributions and on macOS. We’ll show in examples how you can use nix to describe your projects.

Mathis live-demoed nix. From his command lines, the package manager seems to do the job perfectly for fetching the relevant packages for TensorFlow, etc. I’m not very knowledgeable on the DevOps side of Machine Learning, but it appears to me as an alternative solution to Docker, with more flexibility and compositionality than Docker, according to Mathis. Mathis also warned about the steep learning curve for mastering nix.
[nix](https://nixos.org/nix/)
[TensorFlow](https://www.tensorflow.org/)
[Docker](https://www.docker.com/)

Kris Kasidit Methajarunon
[Kris Kasidit Methajarunon](https://www.linkedin.com/in/krismetha/)

Kris presented us his Silver Medal Solution for Kaggle’s Home Credit Default Competition. His slides.
[His slides.](https://drive.google.com/file/d/1yP3ZW26CalmCMn_S8___QvKcxerK9O5c/view?usp=sharing)

In brief,

About the competition:

Home Credit Default Risk
[Home Credit Default Risk](https://www.kaggle.com/c/home-credit-default-risk)

The aim of this competition is to predict whether loan applicants will default eventually in the future, given their information such as income, occupation, age, payment history, and many other features.

To date, this is considered one of the most participated competition on Kaggle with 7,198 teams.

Presentation Highlights:

An overview of his solution (silver medal, ranked 50 / 7,198 or top 0.7%).

In particular, we will be looking at:

§ Feature engineering, arguably the most important part of this competition

§ Handling categorical variables : one hot encoding vs ordinal labelling vs target mean encoding

§ The Three Trees: XGBM vs LGBM vs CatBoost

§ A touch of winner solution, how and what these guys did differently

Alexandre Gerbeaux from DataRobot
[Alexandre Gerbeaux](https://www.linkedin.com/in/alexandre-gerbeaux-b3807258/)
[DataRobot](https://www.datarobot.com/)

Alexandre talked about AutoML, i.e. Automated Machine Learning. Basically, trying to make Kris useless (joking, am I?). So far, the state of the art cannot replace totally a good data scientist with domain expertise, but can ease and improve his productivity a lot! Alexandre live-demoed the DataRobot solution on a loan dataset. Pretty Impressive. Neat and beautiful visualizations. Moving a model from development to production seems seamless and effortless. If you are doing Machine Learning on DataFrames (Kaggle-style), the DataRobot solution is worth a look. Alexandre told me they also release a time-series version of their solution recently.
[Automated Machine Learning](https://en.wikipedia.org/wiki/Automated_machine_learning)
