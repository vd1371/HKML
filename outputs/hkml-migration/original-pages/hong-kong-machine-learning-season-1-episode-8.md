# Hong Kong Machine Learning Season 1 Episode 8

Original: https://www.hkml.ai/2019/03/hong-kong-machine-learning-season-1-episode-8/

When?

Tuesday, March 12, 2019 from 7:00 PM to 9:00 PM

Where?

Refinitiv (Thomson Reuters), ICBC Tower, 18/F, 3 Garden Road, Central, Hong Kong

This meetup was sponsored by Refinitiv (Thomson Reuters) which offered the location, drinks and snacks. Thanks to them, and in particular to Alan Tam.
[Refinitiv (Thomson Reuters)](https://www.refinitiv.com/en)
[Alan Tam](https://www.linkedin.com/in/iam-alantam/)

## Programme:

Tan Li - Machine-Learning-based Market Crash Early Indicator and How TDA Can Boost the Performance at High Cut-offs
[Tan Li](https://www.linkedin.com/in/tanli2006/)

Tan Li, who already presented at the Hong Kong Machine Learning Meetup Season 1 Episode 4, showcased the use of Topological Data Analysis (TDA) to improve the prediction of market crash. Concretely, his goal is to predict 2 weeks ahead if an index will drop more than 5% using past 26 weeks of information. For his study, Tan uses 35 years of weekly price (covering major crashes since 1983). For the c. 10 features used, he focuses on three types: return/change/momentum, spread, volatility. Once this modelling part is done, what follows is standard data science kaggle-like approach: feed the features to a XGBoost model in an online fashion. Tan finds that the AUC scores are decent, i.e. around 75% (reproducing other paper results), but there is a bias to false positives/negatives at the high cut-offs which is a plague of financial machine learning (it is very hard to predict “rare” events such as market crashes as the data is unbalanced - without even mentioning many other pitfalls). In slide 9, he shows that the F1 scores are very close to 0 for high cut-offs. His main idea: Bringing TDA in the data science pipeline. Concretely, he computes and adds TDA features to the set of financial features fed to the boosting trees. The results shown are indeed better at high cut-offs.
[Hong Kong Machine Learning Meetup Season 1 Episode 4](http://marti.ai/hkml/2018/11/21/hkml-s1e4.html)

Generally speaking, it seems that TDA can provide interesting features for regression. Might be worth to explore in alpha research (obtain features different from the rest of the crowd).

Tan’s slides can be found there.
[there](https://drive.google.com/file/d/1ZR9D6AWfp47u4BlzoZYlbGWbmRNwhh64/view?usp=sharing)

Eva Zhao - Bidirectional Long Short-Term Memory network for financial market prediction
[Eva Zhao](https://www.linkedin.com/in/eva-zhao-9723a368/)

Eva Zhao presented her methodology to fine-tune Long Short-Term Memory (LSTM) networks in order to predict whether the next day stock price outperform the cross-sectional median of an universe of stocks. On this very difficult prediction problem, she obtains an accuracy of 55.4%. In slide 6, she presents her methodology: definition of training and testing set, and description of features and target variable (outperformance of the cross-sectional median the next day). Eva’s features rely essentially on past (30 consecutive days) returns. Her contribution intends to empirically proves against weak efficient market hypothesis (WEMH): Past return have effect on future return. In further experiments, she also adds these four features: daily turnover, daily volatility, percentage change from opening to closing price, deviation from average daily price. In slide 7, she describes the model she uses: Bidirectional LSTM (biLSTM), which basically consists in two LSTM whose states are concatenated, one LSTM reading the sequence from left to right and the other one from right to left. In slide 8, she finds added value of using a biLSTM instead of a simple LSTM, but the bulk of the progress comes from the addition of the four technical factors.

Her slides can be found there.
[there](https://drive.google.com/file/d/169fbqEFxUNMOMBuKme5rtvYBMBo1UDvU/view?usp=sharing)

Julian Beltran - Alternative Data for empirical pricing of Alternative Assets (Bitcoin and co.)
[Julian Beltran](https://www.linkedin.com/in/julianmb/)

Julian exposed how he looks at the cryptocurrency markets. For this kind of markets, there are no clear fundamentals, no clear notion of value investing for example. Julian talked about 5 different ways to look at it:

order book and technicals

news sentiment

blockchain movements

pump and dump channels

arbitrage

For each of these, he commented on the idea, and how he implemented it. For example, for news sentiment, he is looking for very specific sentences in tweets and tweets from selected users (influencers in the crypto world), then he uses Google API to analyse them. For people with relevant NLP and automation skills, there is probably a lot of interesting projects around this direction.

You can find more details in his slides.
[slides](https://docs.google.com/presentation/d/1sAFxa7eT2gODUqbXs6oqkATe2CtZUfiWTx2qxVW_nbc/edit?usp=sharing)

Trent McConaghy founder of Ocean Protocol - Decentralized Orchestration for Applications in ML
[Trent McConaghy](http://trent.st/)
[Ocean Protocol](https://oceanprotocol.com/)

Lightning talk from Trent McConaghy, the founder of Ocean Protocol, just arrived in Hong Kong from Berlin. You can find his slides here. Their idea is a protocol to allow technical people without access to entreprise grade datasets to be able to work on these data (and be remunerated for their work). Conversely, entreprises with a lot of potentially sensitive data can also sell their data and/or leverage data scientists without allowing them looking at the (whole) dataset, like a decentralized Kaggle competition. The idea definitively makes sense, the need also. They are in the process of launching the beta, and building the community. Have a look at their website if you are interested to know more.
[here](https://drive.google.com/file/d/18fMCpzWd88uc9dYmsg76fkEUYgdxjNr5/view?usp=sharing)
[website](https://oceanprotocol.com/)
