# Hong Kong Machine Learning Season 4 Episode 8

Original: https://www.hkml.ai/2022/05/hong-kong-machine-learning-season-4-episode-8/

When?

Wednesday, May 11, 2022 from 7:00 PM to 9:00 PM (Hong Kong Time)

Where?

This meetup was hosted on zoom.
[zoom](https://zoom.us/)

The page of the event on Meetup: HKML S4E8
[HKML S4E8](https://www.meetup.com/Hong-Kong-Machine-Learning-Meetup/events/285561760/)

## Programme:

Talk 1: Speaker identification in presidential debate

Speaker: Gautier Marti (25min)

In this short presentation, I just illustrate the task of speaker identification: Who is speaking, and when? This can be done relatively well with basic Machine Learning tools (Gaussian Mixture Models). One could also try to do better by adding a Hidden Markov Model (HMM) on top, or using a deep learning approach such as LSTM or 1D ConvNet.

blog: Speaker identification in ‘Marine Le Pen vs. Emmanuel Macron 2017 French Presidential Debate’ https://marti.ai/ml/2022/04/20/speaker-identification-french-presidential-debate-2017.html
[https://marti.ai/ml/2022/04/20/speaker-identification-french-presidential-debate-2017.html](https://marti.ai/ml/2022/04/20/speaker-identification-french-presidential-debate-2017.html)

(beginner to intermediate level tutorial)

Slides.
[Slides](https://drive.google.com/file/d/1PnxSblD76lpfaLHAdbRIHrmf6EPmakON/view?usp=sharing)

Talk 2: Nonstationary Temporal Matrix Factorization for Multivariate Time Series Forecasting

Speaker: Xinyu Chen (40min) - homepage
[homepage](https://xinychen.github.io/)

Abstract: Modern time series datasets are often high-dimensional, incomplete/sparse, and nonstationary. These properties hinder the development of scalable and efficient solutions for time series forecasting and analysis. To address these challenges, we propose a Nonstationary Temporal Matrix Factorization (NoTMF) model, in which matrix factorization is used to reconstruct the whole time series matrix and vector autoregressive (VAR) process is imposed on a properly differenced copy of the temporal factor matrix. This approach not only preserves the low-rank property of the data but also offers consistent temporal dynamics. The learning process of NoTMF involves the optimization of two factor matrices and a collection of VAR coefficient matrices. To efficiently solve the optimization problem, we derive an alternating minimization framework, in which subproblems are solved using conjugate gradient and least squares methods. In particular, the use of conjugate gradient method offers an efficient routine and allows us to apply NoTMF on large-scale problems. Through extensive experiments on Uber movement speed dataset, we demonstrate the superior accuracy and effectiveness of NoTMF over other baseline models. Our results also confirm the importance of addressing the nonstationarity of real-world time series data such as spatiotemporal traffic flow/speed.

Paper
[Paper](https://arxiv.org/pdf/2203.10651.pdf)

Slides
[Slides](https://xinychen.github.io/slides/notmf.pdf)

GitHub repos:

https://github.com/xinychen/tracebase
[https://github.com/xinychen/tracebase](https://github.com/xinychen/tracebase)

https://github.com/xinychen/transdim
[https://github.com/xinychen/transdim](https://github.com/xinychen/transdim)

(advanced level talk)

Talk 3: A novel approach to volatility option pricing

Speaker: Cyril de Lavergne (40min)

Volatility is often predicted with a standard auto-regressive model of the 5 or 10 past values based on the lowest Akaike criterion which penalizes the negative likelihood with the number of parameters of the model. The model is extended with HAR-RV model which regress the first, fifth and twenty second value of volatility against future value of volatility to improve forecast. More recently, rough volatility by Gatheral was introduced and further improve performance by modelling the volatility as a fractional Brownian motion and Orstein-Uhlenbeck process. Novel techniques such as deep learning and understanding of volatility statistical properties combined can potentially improve forecast. Applications with cutting-edge algorithms such as Temporal Fusion Transformers are exposed.

Slides.
[Slides](https://drive.google.com/file/d/1E5S3Pa84rL6pQec_2FHk8dU2vXIsh9-V/view?usp=sharing)

Short bio: Cyril, originally from France, realized that French business administrative system was not for him and moved to China to grow his first import/export business as soon as he turned 18 years old. He then decided to come to Hong Kong and graduated early with a dual degree from HKUST in Finance and Information Systems. He then worked as trader and support developer before continuing his academic career. He graduated from a Data Science program at HKUST and interned at a proprietary market making company. He also graduated from a Master of Philosophy in Mathematics at HKUST under the supervision of the director of the Financial Mathematics program, Kani Chen. During his study, he interned as Quantitative Researcher and he is now tackling a trillion-dollar market, options, and price it with the help of sophisticated mathematical algorithms and machine learning.

(Intermediate level presentation with illustration in R)

## Video Recording of the HKML Meetup on YouTube

YouTube videos:

HKML S4E8 - Nonstationary Temporal Matrix Factorization for Multivariate Time Series Forecasting
[HKML S4E8 - Nonstationary Temporal Matrix Factorization for Multivariate Time Series Forecasting](https://www.youtube.com/watch?v=nliT4-EoVG8)


[https://www.youtube.com/watch?v=nliT4-EoVG8](https://www.youtube.com/watch?v=nliT4-EoVG8)

![HKML S4E8 - Nonstationary Temporal Matrix Factorization for Multivariate Time Series Forecasting](https://img.youtube.com/vi/nliT4-EoVG8/0.jpg)
