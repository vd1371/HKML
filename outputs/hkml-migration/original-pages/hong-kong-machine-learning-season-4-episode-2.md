# Hong Kong Machine Learning Season 4 Episode 2

Original: https://www.hkml.ai/2021/10/hong-kong-machine-learning-season-4-episode-2/

When?

Wednesday, October 27, 2021 from 7:00 PM to 9:00 PM (Hong Kong Time)

Where?

At your home, on zoom. All meetups will be online as long as this COVID-19 crisis is not over.
[zoom](https://zoom.us/)

The page of the event on Meetup: HKML S4E2
[HKML S4E2](https://www.meetup.com/Hong-Kong-Machine-Learning-Meetup/events/280073490/)

## Programme:

Talk 1: Systematic Pricing and Trading of Municipal Bonds

Petter N. Kolm Professor at New York University (NYU) - Courant Institute of Mathematical Sciences

Sudar Purushothaman Credit Portfolio Manager at Foundation Credit

Abstract

In this article, the authors propose a systematic approach for pricing and trading municipal bonds, leveraging the feature-rich information available at the individual bond level. Based on the proposed pricing framework, they estimate several models using ridge regression and Kalman filtering. In their empirical work, they show that the models compare favorably in pricing accuracy to those available in the literature. Additionally, the models are able to quickly adapt to changing market conditions. Incorporating the pricing models into relative value trading strategies, the authors demonstrate that the resulting portfolios generate significant excess returns and positive alpha relative to the Vanguard Long-Term Tax-Exempt Fund (VWLTX), one of the largest mutual funds in the municipal space.

Keywords: Algorithmic trading, Factor models, Fixed income, Machine learning, Municipal bonds, Pricing models, Relative value, Systematic trading

Paper: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3899133
[https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3899133](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3899133)

The slides.
[slides](https://drive.google.com/file/d/1zoMWtyBh7CNQP7TFv_PmnPD-CjNRxAf_/view?usp=sharing)

Takeaways:

Authors have access to a trade dataset from the MSRB. This dataset contains past trades in the municipal bonds market. Trades are labeled by their notional and their side: dealer-buy, dealer-sell, and inter-dealer trade. Authors use this dataset to calibrate an empirical pricing model which can be used to estimate a fair value for the bonds. Based on the model fair value, one can implement, and backtest, a relative value strategy. Authors show that a simple relative value strategy can outperform the main municipal bonds fund: The Vanguard Long-Term Tax-Exempt Fund. One can try to implement a similar approach to the corporate bonds market. However, especially in the HY segment, fundamentals and cashflows matter. Thus, one may want to add more relevant features to increase one’s chance of success.
[MSRB](https://msrb.org/Market-Transparency/Trade-Data.aspx)

Is it possible to get free/cheap access to this MSRB trade dataset for hobby-research purpose?

Talk 2: AutoGL - An autoML framework & toolkit for machine learning on graph

Chaoyu Guan, Tsinghua University

Abstract

AutoGL (i.e. Auto Graph Learning) is an automatic machine learning (AutoML) toolkit specified for graph datasets & tasks.

It will automatically handle all the stages involved in graph learning problems, including dataset download & management, data preprocessing and feature engineering, neural architecture search, model selection and training, hyper-parameter tuning and ensemble, which will reduce human labors and biases in the machine learning loop by a large scale. This toolkit also serves as a platform for users to implement and test their own auto or graph learning methods.

Website: http://mn.cs.tsinghua.edu.cn/autogl/ GitHub: https://github.com/THUMNLab/AutoGL
[http://mn.cs.tsinghua.edu.cn/autogl/](http://mn.cs.tsinghua.edu.cn/autogl/)
[https://github.com/THUMNLab/AutoGL](https://github.com/THUMNLab/AutoGL)

The slides of his presentation can be found here.
[here](https://docs.google.com/presentation/d/1O9vJw9oYBY7763CY4onBRHXsZO8EXSJW/edit?usp=sharing&ouid=111200802813018715040&rtpof=true&sd=true)

Takeaways:

Chaoyu Guan presentation gave lots of pointers toward relevant literature and existing frameworks.

Some links to explore further around the idea of AutoDL:

DeepWisdom and their AutoDL solution, in Shenzhen
[DeepWisdom](https://github.com/DeepWisdom)
[AutoDL solution](https://github.com/DeepWisdom/AutoDL)

NeurIPS 2018 tutorial on AutoML (recording)
[NeurIPS 2018 tutorial on AutoML (recording)](https://youtube.videoken.com/embed/5A4xbv5nd8c)

automl.org
[automl.org](https://www.automl.org/)

Talk 3: A machine learning approach for predicting hidden links in supply chain with graph neural networks

Edward Elson Kosasih, University of Cambridge

Abstract

Supply chain business interruption has been identified as a key risk factor in recent years, with high-impact disruptions due to disease outbreaks, logistic issues such as the recent Suez Canal blockage showing examples of how disruptions could propagate across complex emergent networks. Researchers have highlighted the importance of gaining visibility into procurement interdependencies between suppliers to develop more informed business contingency plans. However, extant methods such as supplier surveys rely on the willingness or ability of suppliers to share data and are not easily verifiable. In this article, we pose the supply chain visibility problem as a link prediction problem from the field of Machine Learning (ML) and propose the use of an automated method to detect potential links that are unknown to the buyer with Graph Neural Networks (GNN). Using a real automotive network as a test case, we show that our method performs better than existing algorithms. Additionally, we use Integrated Gradient to improve the explainability of our approach by highlighting input features that influence GNN’s decisions. We also discuss the advantages and limitations of using GNN for link prediction, outlining future research directions.

Takeaways:

Edward showcased one potential application of graph neural networks: predicting hidden links in supply chains. This topic is currently quite hot and topical (shortage of chips, cars, energy). His research work is part of his PhD studies sponsored by Aviva, a British multinational insurance company. We invited Edward to come back at the HKML Meetup to share his research progress. Maybe Chaoyu Guan’s AutoGL framework can be useful to him?
[Aviva](https://en.wikipedia.org/wiki/Aviva)
[AutoGL framework](http://mn.cs.tsinghua.edu.cn/autogl/)

Edward also mentions the following start-up which focuses on enriching the global supply chain into a specialized knowledge graph:

Altana, they claim to be the world’s most complete supply chain knowledge graph
[Altana](https://altana.ai/)

## Video Recording of the HKML Meetup on YouTube

YouTube videos:

HKML S4E2 - A machine learning approach for predicting hidden links in supply chain with GNNs
[HKML S4E2 - A machine learning approach for predicting hidden links in supply chain with GNNs](https://www.youtube.com/watch?v=9a4Txf9fP5E)


[https://www.youtube.com/watch?v=9a4Txf9fP5E](https://www.youtube.com/watch?v=9a4Txf9fP5E)

![HKML S4E2 - A machine learning approach for predicting hidden links in supply chain with GNNs](https://img.youtube.com/vi/9a4Txf9fP5E/0.jpg)

HKML S4E2 - AutoGL - An autoML framework & toolkit for machine learning on graph
[HKML S4E2 - AutoGL - An autoML framework & toolkit for machine learning on graph](https://www.youtube.com/watch?v=Rxw8Ta45amc)


[https://www.youtube.com/watch?v=Rxw8Ta45amc](https://www.youtube.com/watch?v=Rxw8Ta45amc)

![HKML S4E2 - AutoGL - An autoML framework & toolkit for machine learning on graph](https://img.youtube.com/vi/Rxw8Ta45amc/0.jpg)

This Meetup is generously sponsored by Darwinex: a Multi-Asset Broker and Asset Manager, regulated by the Financial Conduct Authority (FCA) in the United Kingdom (FRN 586466). It gives traders the Brokerage Venue to trade the markets, and the Regulatory Cover to attract and monetize 3rd-party investor capital. Darwinex is probably the fastest way for talented traders to attract and manage investor capital at minimum cost and without any regulatory and administrative hurdles.

For more information: [email protected] +44 20 3769 1554 Darwinex website
[[email protected]](https://www.hkml.ai/cdn-cgi/l/email-protection#86efe8e0e9c6e2e7f4f1efe8e3fea8e5e9eb)
[Darwinex website](https://hubs.li/H0WbChT0)
