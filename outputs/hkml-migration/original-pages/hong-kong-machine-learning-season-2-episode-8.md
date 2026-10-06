# Hong Kong Machine Learning Season 2 Episode 8

Original: https://www.hkml.ai/2020/07/hong-kong-machine-learning-season-2-episode-8/

When?

Wednesday, July 15, 2020 from 7:00 PM to 9:00 PM

Where?

At your home, on zoom. All meetups will be online as long as this COVID-19 crisis is not over.
[zoom](https://zoom.us/)

Thanks to our patrons for supporting the meetup!

Check the patreon page to join the current list:
[Check the patreon page](https://www.patreon.com/hkml?fan_landing=true)

Tomas Thornquist
[Tomas Thornquist](https://www.linkedin.com/in/tomas-thornquist-060a43122/)

## Programme:

Scott Fullman ML Lead @ Ascent - Snorkel: Weak Supervision for NLP Tasks
[Scott Fullman](https://www.linkedin.com/in/scottfullman/)
[Ascent](https://www.ascentregtech.com/)
[Snorkel](https://www.snorkel.org/)

Snorkel is a framework for weak supervision. This framework enhances productivity in custom Natural Language Processing tasks by enabling fast labeling at scale.

Snorkel helps when

there are no training labels readily available,

no suitable pre-trained models,

only expensive experts could label the data correctly, which is often a prohibitive cost.

This frequently happens for NLP tasks which are domain specific, and use a complex jargon: For example, legalese for Scott’s use case; sentiment and information extraction in finance.

Scott’s slides describe the use of the Snorkel framework, and point toward a few links and papers to go deeper in its understanding.
[Scott’s slides](https://slides.com/smfullman/hkmeetup_snorkel)

Note that I also experimented with Snorkel some time ago to build a sentiment on portfolio managers' blog posts heavy in credit derivatives jargon.

I detailed this attempt in the following posts:

First experiment with Snorkel Metal – Credit Sentiment on DataGrapple blogs
[First experiment with Snorkel Metal – Credit Sentiment on DataGrapple blogs](https://marti.ai/ml/2019/05/01/snorkel-credit-sentiment-part-1.html)

May the Fourth: VADER for Credit Sentiment?
[May the Fourth: VADER for Credit Sentiment?](https://marti.ai/ml/2019/05/04/credit-sentiment-vader.html)

Illya Barziy - Codependence with MlFinLab
[Illya Barziy](https://www.linkedin.com/in/illyabarziy/)

Illya will present the MlFinLab package which implements Machine Learning tools for Finance, largely based on the work of Marcos Lopez de Prado. Amongst the many modules (feature engineering, labeling, portfolio optimization, backtest overfitting, …), Illya will present one in particular: Codependence.

His slides.
[His slides](https://panpip.github.io/HKML_2020_MlFinLab.pdf)

Website: https://hudsonthames.org/ GitHub: https://github.com/hudson-and-thames
[https://hudsonthames.org/](https://hudsonthames.org/)
[https://github.com/hudson-and-thames](https://hudsonthames.org/)

Some personal thoughts based on my PhD, and ongoing, research:

Slide 8/23, “Correlation is typically meaningless unless the two variables follow a bivariate Normal distribution.”

I don’t fully agree with this statement. Rank correlation coefficients such as Spearman’s rho are well suited for elliptical copulas (a bivariate Normal distribution is a particular case of an elliptical distribution). Copulas between stocks returns are typically elliptical ones (i.e. no fancy non-linear patterns to detect, only some outliers making the estimation of Pearson’s correlation harder, and possibly not meaningful at all). So, if the goal is to measure comonotonicity, Spearman’s rho or Kendall’s tau are good enough for that purpose.
[elliptical distribution](https://en.wikipedia.org/wiki/Elliptical_distribution)
[Spearman’s rho](https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient)
[Kendall’s tau](https://en.wikipedia.org/wiki/Kendall_rank_correlation_coefficient)

Slide 10/23, “For instance, the difference between correlations (0.9,1.0) is the same as (0.1,0.2), even though the former involves a greater difference in terms of codependence.” – Lopez de Prado

cf. my research on geometries for copulas to understand more precisely the remark above:

a blog post How to define an intrisic Mean of Correlation Matrices in a Riemannian sense?
[How to define an intrisic Mean of Correlation Matrices in a Riemannian sense?](https://marti.ai/math/2019/12/25/riemannian-mean-correlation.html)

a short research note OPTIMAL TRANSPORT VS. FISHER-RAO DISTANCE BETWEEN COPULAS FOR CLUSTERING MULTIVARIATE TIME SERIE, and associated slides
[OPTIMAL TRANSPORT VS. FISHER-RAO DISTANCE BETWEEN COPULAS FOR CLUSTERING MULTIVARIATE TIME SERIE](https://arxiv.org/pdf/1604.08634.pdf)
[slides](https://www.slideshare.net/GautierMarti/optimal-transport-vs-fisherrao-distance-between-copulas)

Exploring and measuring non-linear correlations: Copulas, Lightspeed Transportation and Clustering, and a blog post with code:Measuring non-linear dependence with Optimal Transport
[Exploring and measuring non-linear correlations: Copulas, Lightspeed Transportation and Clustering](http://proceedings.mlr.press/v55/marti16.pdf)
[Measuring non-linear dependence with Optimal Transport](https://marti.ai/qfin/2020/06/25/copula-optimal-transport-dependence.html)

Slide 12/23, mutual information can be tricky to estimate, and its most standard estimator is so imprecise and brittle to outliers/tails that it defeats its original purpose of being able to robustly measure dependence. However, there are better but relatively unknown alternative estimators which fix this problem. Such an estimator is based on a relationship between mutual information and copula entropy: Mutual Information Is Copula Entropy.
[Mutual Information Is Copula Entropy](https://marti.ai/qfin/2020/07/01/mutual-information-is-copula-entropy.html)

Slide 13/23, GNPR, which is both a representation and a distance, aims at capturing more information than just codependence between two variables. GNPR is based on copulas and the Sklar theorem, which states that a multivariate joint distribution can be written as a joint of uniform variables in $[0, 1]$, with the uniform variables obtained by applying to each one of these variables its cumulative distribution function. So, the whole information of the multivariate distribution can be decomposed into a copula, and a tuple of margins. This decomposition is interesting for clustering variables (e.g. stocks based on their time series of returns) because it takes into account their dependence (through the copula), and the marginal behaviour of the returns. In practice, GNPR helps to craft clusters which will contain stocks which are both highly correlated, and whose returns have the same behaviour. If two stocks are highly correlated, but one has returns that are roughly normally distributed, whereas the other one has jumpy negatively skewed returns with fat tails, they probably should not be considered as belonging to the same cluster from a risk/investment perspective.
[cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function%5D)

Slide 16/23, “In some situations due to numerical reasons the estimated covariance matrix cannot be inverted. Shrinkage is used to avoid this problem.”

Shrinkage is starting to get old. There are better techniques available now, for example, using Random Matrix Theory (slide 18/23) or projecting an empirical correlation (not PSD) to its closest correlation matrix (PSD).

Slide 20/23, idea of the Theory-Implied Correlation (TIC) is similar to the Hierarchical PCA from Marco Avellaneda, i.e. guiding the algorithm working with noisy data with a priori information (such as a GICS classification).
[Hierarchical PCA from Marco Avellaneda](https://arxiv.org/pdf/1910.02310.pdf)

Most of Marcos' material can be found in his SSRN articles, and his new book that I recently read and commented: Machine Learning for Asset Managers.
[Marcos](http://www.quantresearch.org/)
[Machine Learning for Asset Managers](https://marti.ai/qfin/2020/04/12/commented-summary-machine-learning-for-asset-managers.html)
