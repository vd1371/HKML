# Hong Kong Machine Learning Season 2 Episode 3

Original: https://www.hkml.ai/2020/01/hong-kong-machine-learning-season-2-episode-3/

When?

Wednesday, January 20, 2020 from 6:30 PM to 9:00 PM

Where?

Credit Suisse, ICC 88/F, West Kowloon, Hong Kong

This meetup was hosted at Credit Suisse which also offered pizzas and drinks! Thanks to them, and in particular to David Zucker for kindly proposing the venue and arranging everything, and Eric Vergnaud for an original and lively introduction of Credit Suisse as the host.
[David Zucker](https://www.linkedin.com/in/david-zucker-5909a01/)
[Eric Vergnaud](https://www.linkedin.com/in/eric-vergnaud-75a363/)

## Programme:

Note that, as usual, errors and approximations in the summaries below are mine.

Vincent Zoonekynd - Deep learning tools for non-deep learning tasks
[Vincent Zoonekynd](https://www.linkedin.com/in/vincent-zoonekynd-0075ba24/)

Abstract

Companies, buying and selling goods from one another, form a graph, the “supply chain graph”, with companies as nodes and weighted edges representing the value of those supplier-customer relations, but only part of this graph is known. We want to somehow impute the missing values on those edges. The goal of this talk is three-fold. First, we will show how entropy, and the notion of “maximum entropy distribution”, defines a natural way of completing this graph. Then, we will show how convex solvers can solve this problem: they are now surprisingly easy to use, very scalable, but not widely known. Finally, we will show that deep learning frameworks can also be leveraged to address similar problems: they are not limited to neural networks.

The slides of Vincent’s presentation can be found here.
[here](https://drive.google.com/file/d/1O_bizT2yTtz1_N93Yui3RywXfIO4v8s2/view?usp=sharing)

Personal takeaways

Unrelated to the presentation but quite interesting as well, Vincent maintains a literature review on machine learning, statistics and applied mathematics which can be found on his blog there.
[there](http://zoonek.free.fr/Ecrits/articles.pdf)

Vincent introduced the notion of entropy (well known in physics and information theory) usually associated to quantify information. He suggested to interpret entropy as a measure of surprise rather than information for the rest of the talk, as more intuitive. He explained what is the entropy (surprise) of a sample, and of a distribution (simply the mean surprise). Then, through a few examples, Vincent showcased maximum entropy distributions (discrete uniform, continuous uniform on a finite support, Normal when the mean and variance are given). Basically, maximum entropy distributions are the most general (uninformative) given a set of constraints, and should be considered when relevant a priori information is lacking. Vincent then casts its constrained matrix completion problem into a constrained convex optimization problem: maximizing the entropy satisfying the constraints. The presentation contains a brief recap on convex optimization with linear regression and portfolio optimization as examples of such optimization problems. Nowadays, the CVX package (available in many languages including Python, R, and Julia) allows to express and solve seamlessly these problems. Another way to solve these problems, that Vincent explored, is to leverage deep learning frameworks such as tensorflow and pytorch which were designed to optimize functions via gradient descent. However, they can only deal with unconstrained optimization so one has to recast the constraints into penalties. Several problems arise: How to scale the penalties? All the same weighting across the different constraints? How to increase them through the iterative optimization steps? This approach seems more suitable to very large optmization problems.
[information theory](https://en.wikipedia.org/wiki/Information_theory)

José Vinícius de Miranda Cardoso - Breaking Down Risk Parity Portfolio: A Practical Open Source Implementation
[José Vinícius de Miranda Cardoso](https://www.linkedin.com/in/mircaze/)

Abstract

In this talk I will explain the behind the scenes of the now very popular risk parity portfolio, its convex and non-convex formulations, and I will present open source implementations of state-of-the-art algorithms with practical examples.

Zé Vinícius slides.
[Zé Vinícius slides](https://drive.google.com/file/d/13aqpa5uVAJdNQSa1eZNj4AV_bIzLZylw/view?usp=sharing)

Personal takeaways

Part of Vincent’s talk was a good introduction to this talk (e.g. portfolio optimization as a convex optimization problem). José is a PhD student of Prof. Daniel Palomar at HKUST. The idea of risk parity portfolios is to allocate risk rather than capital. Quite often practitioners use an approximation of the original risk parity problem by considering the covariance matrix to be diagonal which leads actually to the inverse volatility portfolio. However, it discards important information: correlation of the returns. During this talk, we learn that there are actually many variants of the risk parity portfolios, some of which include expected returns in their objective function. Open source code is available on Daniel Palomar’s GitHub with contributions from José. After the talk, members of the audience asked questions about the now quite famous Hierarchical Risk Parity by de Prado. It happens that I experimented quite a bit with this HRP portfolio construction method (cf. these blogs HRP Part I, HRP Part II, HRP Part III). Questions were along the lines “which one is better in practice?”. Hard to say. Most of the studies reach a conclusion, if any, based on a particular dataset. Results depend too strongly on a given universe of assets and time frame to be of scientific value. There is no strict dominance of a particular method in general, or at least to the best of my (and many) knowledge. To illustrate the extent of the debate, some researchers and practitioners don’t feel complex portfolio construction is worth the effort and advocate for very simple allocation such as equal weighting: How Inefficient is the 1/N Asset-Allocation Strategy? Answer from the paper: It is not. Inverse volatility is also a good simple candidate. Digression I think it is good practice to test, understand and compare these portfolio construction methods on simulated data. First, on very simple cases like samples from multivariate Gaussians, then adding some tails in the margins and/or in the dependence structure (cf. copulas). Comparison between several methods can be done more seriously. However, it is not clear how well results and conclusions will generalize to real data as the generative models to do these Monte Carlo studies may be too simplistic and far from reality. This motivated my research on using GANs (or VAEs) to sample realistic correlation matrices (cf. this web app and this blog), and thus more realistic multivariate distribution of returns. I should follow-up with a comparison of these portfolio construction methods using CorrGAN, and eventually present it at the meetup if results are convincing.
[Daniel Palomar](https://www.danielppalomar.com/)
[Open source code is available](https://github.com/dppalomar/riskParityPortfolio)
[Daniel Palomar’s GitHub](https://github.com/dppalomar)
[Hierarchical Risk Parity](https://jpm.pm-research.com/content/42/4/59)
[HRP Part I](https://gmarti.gitlab.io/qfin/2018/10/02/hierarchical-risk-parity-part-1.html)
[HRP Part II](http://marti.ai/qfin/2018/10/15/hierarchical-risk-parity-part-2.html)
[HRP Part III](http://marti.ai/qfin/2019/12/04/hierarchical-risk-parity-part-3.html)
[How Inefficient is the 1/N Asset-Allocation Strategy?](https://warwick.ac.uk/fac/soc/wbs/subjects/finance/events/recentevents/pastevents/behaviouralfinance1day/uppal_paper_06.pdf)
[copulas](https://en.wikipedia.org/wiki/Copula_(probability_theory))
[this web app](http://www.corrgan.io/)
[this blog](http://marti.ai/ml/2019/10/13/tf-dcgan-financial-correlation-matrices.html)
[CorrGAN](https://arxiv.org/pdf/1910.09504.pdf)

Franklin Leung - The blunders with my first AI commercial project
[Franklin Leung](https://www.linkedin.com/in/franklin-leung-3150022/)

Abstract

My experience with my first AI project - OCR of medicine label, which is to be deployed in a dozen of old aged homes.

The talk will share a personal experience (including all sorts of pains) of developing a simple OCR application using Google Cloud API for medical label recognition and information extraction. The application is to be deployed over a dozen of old aged homes with their data input efforts significantly saved.

Franklin’s slides.
[Franklin’s slides](https://drive.google.com/file/d/1_beJHEiOCl0VRCSQKGAcFHo8_dCjJOfg/view?usp=sharing)

Personal takeaways

A practical talk from a practitioner. Franklin’s talk was about the clever use of existing technologies to deliver a product. It was impressive how many challenges Franklin had to face, from hardware to software. Unsurprisingly, straight out of the box AI APIs (say Google’s Tesseract OCR) don’t work well on niche subjects: Medical prescriptions written in (traditional) Chinese. Plus, it is well known around the world that medical doctors have the worst hand-writting possible. Franklin has shown an impressive determination facing all these difficulties, and finding ways to solve them. Along the technical slides, we got some touristic insights of Estonia (the digital nomad lifestyle) and Russia. In the end, Franklin’s product will be used to ease the labour intensive data entry required. It is still better to have a human in the loop as these kind of software are not fault-free. In the medical field, errors could prove fatal. These solutions should not be meant to work fully autonomously (yet), but should be used to double check the work done by humans helping them reducing the probability of an error (e.g. the case of medicine dispenser where the pills are wrongly labeled; a computer vision system trained on a pill classification task could help double check if the pill labelling is correct and flag any dubious cases).
[Tesseract OCR](https://en.wikipedia.org/wiki/Tesseract_(software))

Franklin’s presentation was lively with lots of spicy and funny anecdotes here and there.
