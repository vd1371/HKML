# Hong Kong Machine Learning Season 1 Episode 2

Original: https://www.hkml.ai/2018/08/hong-kong-machine-learning-season-1-episode-2/

Wilson Fok - Processing Medical 3D Scans - An example of heart segmentation
[Wilson Fok](https://www.linkedin.com/in/wilson-fok-49426447/)

Wilson presented us his approach on the 2018 Atrial Segmentation Challenge based on ensemble of convolutional neural networks. Here are the slides of his talk, and the GitHub for the heart segmentation code.
[slides of his talk](https://drive.google.com/file/d/1JOP-tgOSR6p8mnqRaR7nDWVCbsLU8clk/view?usp=sharing)
[heart segmentation code](https://github.com/WilsonWIL/heart-segmentation)

Abstract: Training an ensemble of convolutional neural networks requires much computational resources for a large set of high-resolution medical 3D scans because deep representation requires many parameters and layers. In this study, 100 3D late gadolinium-enhanced (LGE)-MRIs with a spatial resolution of 0.625 mm × 0.625 mm × 0.625 mm from patients with atrial fibrillation were utilized. To contain this training cost, down-sampling of images, transfer learning and ensemble of network’s past weights were deployed. This approach proposes an image processing stage using down-sampling and contrast limited adaptive histogram equalization, a network training stage using a cyclical learning rate schedule, and a testing stage using an ensemble. While this method achieves reasonable segmentation accuracy with the median of the Dice coefficients at 0.87, this method can be used on a computer with a GPU that has a Kepler architecture and at least 3GB memory.

By the way, he just finished his PhD thesis, and is looking for an interesting opportunity to apply his skills in AI. Do not hesitate to contact him!

Kris Methajarunon - A summary of ``Machine Learning and Finance: The New Empirical Asset Pricing'' (SoFiE Summer School, Chicago)
[Kris Methajarunon](https://www.linkedin.com/in/krismetha/)

Kris has presented us his takeaways from the SoFiE Summer School at University of Chicago: Machine Learning and Finance: The New Empirical Asset Pricing. He particulary focused his presentation on Empirical Asset Pricing via Machine Learning, a very recent paper (this version: July 21, 2018) exploring the use of different machine learning regressions on a given dataset of economic variables to predict future stock returns.
[Machine Learning and Finance: The New Empirical Asset Pricing](https://finmath.uchicago.edu/sites/finmath.uchicago.edu/files/uploads/Stevanovich/Program%20Overview%2C%20Summer%20School%202018%2C%20March%201.pdf)
[Empirical Asset Pricing via Machine Learning](https://poseidon01.ssrn.com/delivery.php?ID=942094068073002101091107112092124086034008059068089043102126107104085001073089114076103052038060105029109001070069120124099031052078027028048090118029011093113000029095043064103109126077090010073085022085098031124023000123078008118028064016095093097067&EXT=pdf)

Personal opinion: To be noticed, despite being a recent paper, they have still a rather outdated view of neural networks being very general (universal approximators) non-linear regressors rather than useful representation builders, the latter being used efficiently by linear models. A big claim of the paper is that one can reach a Sharpe ratio of 2+ using these neural networks (once again only an old pyramidal architecture (1993) is tested) whereas linear models only achieve a Sharpe ratio of 0.5- using the same dataset. Bagging/Boosting trees methods lie somewhere in between. It’s hard to evaluate and reproduce such papers. People in the audience were doubtful and some results were against their own experience. I would like to see more code for such papers (a GitHub with some sample data). Also, since the point is only about the regression prowess of such non-linear models, why not testing them on synthetic stochastic time series, i.e. sampled from some model whose properties and expected results are known? At least, it would be reproducible, and would help to answer questions such: Do historical quarterly data really provide enough data points to fit a neural network?!

Gautier Marti (https://gmarti.gitlab.io/) - A review of two decades of correlations, hierarchies, networks and clustering in financial markets
[https://gmarti.gitlab.io/](https://gmarti.gitlab.io/)

I presented a review of some clustering and network analysis techniques applied to financial datasets, and their statistical limits. The bulk of the literature focuses on correlations between returns, yet these methods can also be useful for alternative datasets. Here are the slides. I also presented (not included in the previous slides) a way of combining several rankings provided by experts based on a `rank-dominance' directed network that can be cast into a markov chain. The stationary distribution of the random walk provides the final combined ranking. I wrote a first draft about this approach there.
[Here](https://www.slideshare.net/GautierMarti/a-review-of-two-decades-of-correlations-hierarchies-networks-and-clustering-in-financial-markets)
[there](https://gmarti.gitlab.io/ml/2018/08/16/combination-rankings.html)
