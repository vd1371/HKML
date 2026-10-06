# Hong Kong Machine Learning Season 2 Episode 7

Original: https://www.hkml.ai/2020/06/hong-kong-machine-learning-season-2-episode-7/

When?

Wednesday, June 10, 2020 from 7:00 PM to 9:00 PM

Where?

At your home, on zoom. All meetups will be online as long as this COVID-19 crisis is not over.
[zoom](https://zoom.us/)

Thanks to our patrons for supporting the meetup!

Check the patreon page to join the current list:
[Check the patreon page](https://www.patreon.com/hkml?fan_landing=true)

Tomas Thornquist
[Tomas Thornquist](https://www.linkedin.com/in/tomas-thornquist-060a43122/)

## Programme:

Max Halford - A brief introduction to online machine learning
[Max Halford](https://www.linkedin.com/in/maxhalford/)

Online learning algorithms are usually much less well-known than their batch counterparts: For example, the estimation of mean, variance, and covariance.
[estimation of mean, variance, and covariance](https://www.wikiwand.com/en/Algorithms_for_calculating_variance#/Welford's_online_algorithm)

Max is developing a library, Creme, available on GitHub, for online machine learning.
[Creme, available on GitHub](https://github.com/creme-ml/creme)

Online, in this context, means learning (updating the model) one sample at a time. This is particularly suited to streaming data, or big data that don’t fit in memory.

Max touts the benefits of online learning in his presentation slides.
[slides](https://maxhalford.github.io/slides/hkml2020.pdf)

He notably mentioned that Bayesian inference was one good way to do online learning, and invited us to look at his blog, and more particularly the following entry:
[his blog](https://maxhalford.github.io/)

Bayesian linear regression for practitioners
[Bayesian linear regression for practitioners](https://maxhalford.github.io/blog/bayesian-linear-regression/)

Finally, Max also walked us through this online linear regression notebook demo.
[notebook demo](https://gist.github.com/MaxHalford/e23c4fe26c035b818bc40cbdde9c3a8f)

I wrote quickly this simple example to showcase Creme; an online linear regression on noisy time series containing a breakpoint:

Eason Suen - Deep Reinforcement Learning – A Quick Dive
[Eason Suen](https://www.linkedin.com/in/easonsuen/)

Eason presented a broad picture of the current state of Reinforcement Learning, several branches: Q-learning, policy gradients, actor critic, evolution strategy, model-based RL. For each approach, he described the pros and cons, and how they relate to each other.

More details in his slides.
[More details in his slides.](https://drive.google.com/file/d/1L5K_zPbke3SQhMLt1i89xefLnFPMWDro/view?usp=sharing)

Several pointers are listed, an entertaining video to watch is the Multi-Agent Hide and Seek from OpenAI. Their gym is a good place to start learning. Google Research Football or AWS DeepRacer are other interesting projects to learn while having fun.
[Multi-Agent Hide and Seek](https://www.youtube.com/watch?v=kopoLzvh5jY)
[gym](https://gym.openai.com/)
[Google Research Football](https://github.com/google-research/football)
[AWS DeepRacer](https://wiki.deepracing.io/)

As expected in Hong Kong, many questions about the applications of such technology in Finance to learn how to trade markets. Eason take-on: Trading markets may not be where Reinfocement Learning shines the most as the typical use case for Reinforcement Learning are problems where the decision process is complex but the prediction part is easy (e.g. a computer vision problem), whereas in trading markets the decision process is rather simple (buy low sell high) compared to the prediction part which is close to impossible.
