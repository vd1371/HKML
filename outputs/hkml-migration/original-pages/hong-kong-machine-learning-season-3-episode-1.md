# Hong Kong Machine Learning Season 3 Episode 1

Original: https://www.hkml.ai/2020/09/hong-kong-machine-learning-season-3-episode-1/

When?

Wednesday, September 30, 2020 from 7:00 PM to 9:00 PM

Where?

At your home, on zoom. All meetups will be online as long as this COVID-19 crisis is not over.
[zoom](https://zoom.us/)

## Programme:

## Getting Started with Network Science & Analytics

## Synopsis

Our collective experience with COVID-19 continues to remind us about the growing importance and role of networks in affecting nearly every facet of our lives. The field of network science/graph theory that historically emerged as an effort to understand human relationships and behavior has now evolved into a frontline discipline in the study of complex relationships, contagion patterns, social influence, and community engagement in domains spanning healthcare, urban systems, fintech, education, and social media. In this talk, we will briefly introduce some key concepts that define network analysis, discuss some on-going projects in financial services, and demonstrate a stock-price network analysis using LynxKite, a new open-source platform that lets you get started (quickly) with your own network analytics project.

## Bios

Prasanta Bhattacharya is a Research Scientist with the Institute of High Performance Computing (IHPC), Singapore and an Adjunct Assistant Professor with the NUS Business School. Prasanta holds a Ph.D. in Information Systems, focusing on predictive and causal inference problems in large social networks. His current research leverages large-scale, and fine-grained behavioral data to address complex problems in digital marketing, fintech, and ed-tech contexts, particularly in emerging Asian markets. Prasanta actively collaborates with leading industry partners from around the world, and has presented his research in major computer science, information systems and marketing conferences worldwide.

Andras Nemeth is the CTO of Lynx Analytics, a graph analytics consultancy. He is in charge of the development of LynxKite, the company’s graph data science platform. He has also worked on the technology aspects of various graph projects during his tenure at Lynx. Before Lynx, he worked at Google on ad targeting at YouTube and then on semantic understanding of web pages based on the Knowledge Graph.
[Lynx Analytics](http://www.lynxanalytics.com/)
[LynxKite](http://www.lynxkite.com/)

Fai-Keung Ng started his tech career at Yahoo! Fai-Keung Ng is one of the trailblazers for performance marketing, having launched the sponsored search product globally since 2005. After leaving Yahoo!, he joined and held leadership positions at a number of AI/analytics companies: AT Internet, ViSenze, and currently Lynx Analytics, where he advances enterprises' digital transformation with data. At Lynx, his team developed an open source graph data science platform, LynxKite, with the aim to democratize the adoption of Graph AI.

## Presentation material

Slides of the talk.
[Slides](https://drive.google.com/file/d/1zdP-fMn-yHdCF_WbvLf7hmOYilvaFf8Z/view?usp=sharing)

## Demo

The demo will be largely based on this paper:

Predicting Stock Movements Using Market Correlation Networks
[Predicting Stock Movements Using Market Correlation Networks](http://snap.stanford.edu/class/cs224w-2015/projects_2015/Predicting_Stock_Movements_Using_Market_Correlation_Networks.pdf)

and these data sets:

https://www.kaggle.com/dgawlik/nyse?select=prices.csv
[https://www.kaggle.com/dgawlik/nyse?select=prices.csv](https://www.kaggle.com/dgawlik/nyse?select=prices.csv)

https://www.kaggle.com/borismarjanovic/price-volume-data-for-all-us-stocks-etfs?
[https://www.kaggle.com/borismarjanovic/price-volume-data-for-all-us-stocks-etfs?](https://www.kaggle.com/borismarjanovic/price-volume-data-for-all-us-stocks-etfs?)

http://www.complex-networks.net/datasets.html
[http://www.complex-networks.net/datasets.html](http://www.complex-networks.net/datasets.html)

GitHub repo of LynxKite
[LynxKite](https://github.com/lynxkite/lynxkite)

## Video Recording of the HKML Meetup on YouTube

YouTube video: Hong Kong Machine Learning Meetup Season 3 Episode 1
[Hong Kong Machine Learning Meetup Season 3 Episode 1](https://www.youtube.com/watch?v=EfjwQhqrZh4)


[https://www.youtube.com/watch?v=EfjwQhqrZh4](https://www.youtube.com/watch?v=EfjwQhqrZh4)

![Hong Kong Machine Learning Meetup Season 3 Episode 1](https://img.youtube.com/vi/EfjwQhqrZh4/0.jpg)

## Personal Takeaways

Prasanta presented in slides 14, 15, 16 a couple of network centrality measures. One has really to understand their definition to apply them correctly: Different centrality measures may point toward different central nodes; Depending on the application, certain central nodes are more relevant than others. The following paper is discussing this issue:

Identifying sets of key players in a social network
[Identifying sets of key players in a social network](https://www.bebr.ufl.edu/sites/default/files/Borgatti%20-%202006%20-%20Identifying%20sets%20of%20key%20players%20in%20a%20social%20networ.pdf)

Besides centrality measures, another important task is prediction using the graph structure. Prasanta pointed toward GraphSAGE: Inductive Representation Learning on Large Graphs, which I did not know about, a framework for inductive representation learning on large graphs. Concretely, GraphSAGE can be used to generate low-dimensional vector representations for nodes (aka embeddings of nodes).
[GraphSAGE: Inductive Representation Learning on Large Graphs](http://snap.stanford.edu/graphsage/)

The academic paper behind GraphSAGE: Inductive Representation Learning on Large Graphs
[Inductive Representation Learning on Large Graphs](https://arxiv.org/pdf/1706.02216.pdf)

GraphSAGE GitHub repo
[GraphSAGE GitHub repo](https://github.com/williamleif/GraphSAGE)

Prasanta also briefly discussed another use case: insurance fraud. Detection of insurance fraud can benefit from a network approach. For example, this blog post from neo4j (a graph database): Catching Insurance Fraud Using Graph Database Technology
[Catching Insurance Fraud Using Graph Database Technology](https://neo4j.com/blog/insurance-fraud-detection-graph-database/)

Personal question: What is the most relevant (or just a good one) graph database nowadays?

A brief introduction to causal inference on networks in slide 23. I do not know much on this topic besides the use of Bayesian networks and PGMs for that purpose.
[use of Bayesian networks and PGMs for that purpose.](https://marti.ai/qfin/2020/08/30/book-probabilistic-graphical-models-finance-denev.html)

A few papers mentioned in the slide for further reading:

Do your online friends make you pay? A randomized field experiment on peer influence in online social networks
[Do your online friends make you pay? A randomized field experiment on peer influence in online social networks](http://www.misrc.umn.edu/Papers/Research%20Papers/Bapna_Umyarov_LastFM.pdf)

Creating Social Contagion Through Viral Product Design: A Randomized Trial of Peer Influence in Networks
[Creating Social Contagion Through Viral Product Design: A Randomized Trial of Peer Influence in Networks](http://dylantwalker.com/pdfs/Creating-Social-Contagion-Through-Viral-Product-Deisign-Aral-and-Walker-Management-Science-2011.pdf)

Identifying Social Influence in Networks Using Randomized Experiments
[Identifying Social Influence in Networks Using Randomized Experiments](http://www.dylantwalker.com/pdfs/Identifying-Social-Influence-in-Networks-Using-Randomized-Experiments-Aral-and-Walker-IEEE-Intelligent-Systems.pdf)

Exposure to ideologically diverse news and opinion on Facebook
[Exposure to ideologically diverse news and opinion on Facebook](https://www.researchgate.net/profile/Solomon_Messing/publication/276067921_Political_science_Exposure_to_ideologically_diverse_news_and_opinion_on_Facebook/links/5699070a08ae6169e55161f5/Political-science-Exposure-to-ideologically-diverse-news-and-opinion-on-Facebook.pdf)

Experimental evidence of massive-scale emotional contagion through social networks
[Experimental evidence of massive-scale emotional contagion through social networks](https://www.pnas.org/content/pnas/111/24/8788.full.pdf?ref=hvper.com&utm_source=hvper.com&utm_medium=website)

Finally, Prasanta talked about one of the projects he is working on at the moment: Contagion in loan default behavior in microfinance. There are evidence of a network effect in loan defaulting behavior, which differs based on the sample credit risk.

Andras did a demo of LynxKite: A open source graph data science platform.

Ways to get started:

Wizards and demos built by LynxKite: http://try.lynxkite.com/
[http://try.lynxkite.com/](http://try.lynxkite.com/)

Download or try on the cloud: https://lynxkite.com/download
[https://lynxkite.com/download](https://lynxkite.com/download)

A friendly consultation on using graph: [email protected]
[[email protected]](https://www.hkml.ai/2020/09/hong-kong-machine-learning-season-3-episode-1/lynxkite@lynxkite.com)

I will probably give it a try for my networks use cases. If I do so, I will blog here about my experience with this tool. From the demo we saw, the lynxkite platform looks very impressive and could provide huge efficiency gains compared to a code-only solution (networkx, scikit-learn, tensorflow/pytorch).

Basically, it has some of the Dataiku platform flavours, but focused on networks.
[Dataiku](https://www.dataiku.com/)

In the demo, it seemed very easy to set up a stock prediction task based on the network structure features (which are automatically computed). However, for now, the tool doesn’t take into account node features into account (but node features can usually be casted into network edges, and therefore be taken into account in the embeddings/centrality measures which are network structure-based features). The platform has deep learning capabilities such as Graph Convolutional Networks.
[Graph Convolutional Networks](https://tkipf.github.io/graph-convolutional-networks/)

Though it does not have this feature (yet?), I can totally see lynxkite being able to do AutoML (like DataRobot) on networks:

Given a graph and its attributes (e.g. nodes features)

Define a target variable to predict

AutoML computes structural and content features

AutoML performs: Feature importance / hyper-parameters optimisation / model selection

Prediction (regression / classification) results

Thanks to our patrons for supporting the meetup!

Check the patreon page to join the current list:
[Check the patreon page](https://www.patreon.com/hkml?fan_landing=true)

Tomas Thornquist
[Tomas Thornquist](https://www.linkedin.com/in/tomas-thornquist-060a43122/)
