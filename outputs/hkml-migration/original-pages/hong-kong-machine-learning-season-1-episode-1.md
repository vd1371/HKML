# Hong Kong Machine Learning Season 1 Episode 1

Original: https://www.hkml.ai/2018/07/hong-kong-machine-learning-season-1-episode-1/

Jill-Jênn Vie (https://jilljenn.github.io/) - Mangaki
[https://jilljenn.github.io/](https://jilljenn.github.io/)
[Mangaki](https://mangaki.fr/about/en)

Jill-Jênn presented us his personal project: Mangaki, a non-profit recommender system of manga and anime. From the anime you watched and the manga you read, their algorithm discover new precious pearls that you will love! If you want to join the project, there’s plenty to do!

From a technical point of view, Jill-Jênn presented the two main approaches to recommender systems: content-based and collaborative filtering. The approach implemented in Mangaki is a novel one which is both using and mixing the information from content and collaborative filtering. The recommender system is also using features from the poster associated to the anime (using an illustration to vector embedding technique) to deal with cold starts (when a new movie is added to the database). Their approach is described in this paper and the associated slides.
[paper](https://arxiv.org/abs/1709.01584)
[slides](http://jill-jenn.net/_static/slides/manpu2017.pdf)

Eugene Ho (from dayta) - On recent advances in Computer Vision for Human Re-identification
[dayta](http://dayta.ai/)

In his talk, Eugene focused on how the application of techniques such as mutual learning and re-ranking in CNNs can improve the accuracy in human re-identification and other computer vision technologies. His presentation slides.
[slides](https://drive.google.com/file/d/1G2GXvwXGSIinKDNSO5b5jh86uXl4zpvX/view?usp=sharing)

AlignedReID: Surpassing Human-Level Performance in Person Re-Identification
[AlignedReID: Surpassing Human-Level Performance in Person Re-Identification](https://arxiv.org/pdf/1711.08184.pdf)

Re-ranking person re-identification with k-reciprocal encoding
[Re-ranking person re-identification with k-reciprocal encoding](http://openaccess.thecvf.com/content_cvpr_2017/papers/Zhong_Re-Ranking_Person_Re-Identification_CVPR_2017_paper.pdf)

Deep Mutual Learning (GitHub)
[Deep Mutual Learning](http://openaccess.thecvf.com/content_cvpr_2018/CameraReady/0304.pdf)
[GitHub](https://github.com/YingZhangDUT/Deep-Mutual-Learning)

Gautier Marti (https://gmarti.gitlab.io/) - Autoregressive Convolutional Neural Networks for Asynchronous Time Series
[https://gmarti.gitlab.io/](https://gmarti.gitlab.io/)

In this talk, I have presented a CNN architecture for predicting autoregressive asynchronous time series. I have illustrated its application on predicting traders' quotes of credit default swaps (proprietary dataset from Hellebore Capital), and on artificial time series. The paper is available there, and slides are there.
[Hellebore Capital](http://helleborecapital.com/)
[there](http://proceedings.mlr.press/v80/binkowski18a/binkowski18a.pdf)
[there](https://www.slideshare.net/GautierMarti/autoregressive-convolutional-neural-networks-for-asynchronous-time-series)

Code is available on Mikołaj Binkowski GitHub.
[GitHub](https://github.com/mbinkowski/nntimeseries)
