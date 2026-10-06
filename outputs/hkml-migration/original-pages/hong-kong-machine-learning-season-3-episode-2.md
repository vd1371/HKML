# Hong Kong Machine Learning Season 3 Episode 2

Original: https://www.hkml.ai/2020/10/hong-kong-machine-learning-season-3-episode-2/

When?

Thursday, October 8, 2020 from 8:00 PM to 10:00 PM (Hong Kong Time)

Where?

At your home, on zoom. All meetups will be online as long as this COVID-19 crisis is not over.
[zoom](https://zoom.us/)

## Programme:

Uri Lee

Bio: Uri is a final year Computer Science student at King’s College London and has worked for large banks such as JP Morgan, to robotics startup, such as Cambrian Intelligence.

Title: Complex Networks in Finance

Abstract: Uri will present the network visualisation tools in the Mlfinlab package and the theory behind why network analysis is important in finance. She will present potential applications through a case study on Covid-19 using Minimum Spanning Trees and Planar Maximally Filtered Graphs, and showcase how the visualisation tools can be used to create interactive network visualisations.

Valeriia Pervushyna

Bio: Valeriia Pervushyna is a Master’s student in the Quantitative Finance program at the University of Warsaw. Her research is mainly centred on applications of stochastic processes to optimizing pairs trading strategies.

Title: Statistical Arbitrage with the Ornstein-Uhlenbeck Model

Abstract: Presentation of OrnsteinUhlenbeck submodule of Mlfinlab package that allows the user both to create an optimal mean-reverting portfolio and to find the optimal timing of trades using the properties of the Ornstein-Uhlenbeck process. The module is based on the work of Professor. Tim Leung and Xin Lee: “Optimal Mean reversion Trading: Mathematical Analysis and Practical Applications”.

David Munoz Constantine

Bio: M.S. in Computer Science at Portland State University, from Ecuador. Research topics on evolution strategies for optimizing multi-dimensional, non-differentiable functions.

Title: Synthetic data generation with MlFinLab

Abstract: How to use MlFinLab’s synthetic data generation module to augment your models. Why do we need synthetic data when we live in an age of data abundance? What kind of properties synthetic data must have for it to be useful? This presentation will answer these questions and will show you how you can use MlFinLab to generate synthetic correlation matrices and time series. The data generation techniques include vines (R, C, D, Partial Correlation), Extended Onion Method, Hierarchical Correlation Block Model (HCBM), bootstrapping (row, pair, block), clustered time series, and CorrGAN.

## Video Recording of the HKML Meetup on YouTube

YouTube video: Hong Kong Machine Learning Meetup Season 3 Episode 2
[Hong Kong Machine Learning Meetup Season 3 Episode 2](https://www.youtube.com/watch?v=mc9U8v0IeO8)


[https://www.youtube.com/watch?v=mc9U8v0IeO8](https://www.youtube.com/watch?v=mc9U8v0IeO8)

![Hong Kong Machine Learning Meetup Season 3 Episode 2](https://img.youtube.com/vi/mc9U8v0IeO8/0.jpg)

## Personal Takeaways

mlfinlab package is growing fast.

Concerning the module ‘Complex Networks’:

This module contains the implementation of the Minimum Spanning Tree (MST) and the Planar Maximally Filtered Graph (PMFG). The module also allows to interactively visualize these networks in the browser.

I would love to see network-based features added to this module, i.e. statistics of the network (e.g. centrality, network diameter). These features could be predictive of market stress (a couple of papers referenced in my review are claiming this is the case). Besides the typical network statistics, it could also be very useful to have an easy access to node embeddings (obtained by encoding both structural and contextual information available at the node level). These node embeddings would be interesting features to have for machine learning related tasks (e.g. predictions of future returns) as we saw in the previous meetup during the lynxkite demo.
[review](https://arxiv.org/pdf/1703.00485.pdf)
[in the previous meetup during the lynxkite demo](https://marti.ai/hkml/2020/09/30/hkml-s3e1.html)

Potential applications:

mean-reversion inside a cluster

mean-reversion between clusters

cluster-based factor models

cluster-based returns residualizations

portfolio allocation (central or peripheral portfolios? timing?) on assets / pairs trades / mean-reverting baskets

Concerning the module ‘Optimal Mean Reversion’:

Implementation of Tim Leung work. I think that, along those lines, papers from Alexandre d’Aspremont (ENS) and Daniel Palomar (HKUST) on mean-reverting baskets (extension of pairs trades) are very relevant. A stat arb module is on its way!

Concerning the module ‘Synthetic Data Generation’:

For now, the package contains several variations of the bootstrap method, and methods to generate synthetic correlation matrices (and thus multivariate ‘time series’ obtained by sampling in a multivariate distribution parameterized by a synthetic correlation matrix). This is definitely useful for risk and portfolio allocation applications (e.g. to understand how a method would have performed in alternative (but very likely) scenarios). For pure (univariate) time series applications (e.g. directional predictions), the module has not yet the capability to generate realistic synthetic paths (besides using bootstrapping techniques). There are a couple of GAN papers which claim to be able to capture all the known financial time series stylized facts; Their implementation in mlfinlab could be a great add!

It would be exciting to explore further the interactions between these three modules:

generate synthetic but realistic mean-reverting time series, and learn to trade them (independently),

generate synthetic but realistic mean-reverting time series which have common (hierarchical) risk factors (cf. CorrGAN or HCBM model), and learn to diversify your bets using a correlation network.

Thanks to our patrons for supporting the meetup!

Check the patreon page to join the current list:
[Check the patreon page](https://www.patreon.com/hkml?fan_landing=true)

Tomas Thornquist
[Tomas Thornquist](https://www.linkedin.com/in/tomas-thornquist-060a43122/)
