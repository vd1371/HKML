# Hong Kong Machine Learning Season 2 Episode 2

Original: https://www.hkml.ai/2019/10/hong-kong-machine-learning-season-2-episode-2/

When?

Thursday, October 17, 2019 from 6:30 PM to 9:00 PM

Where?

Entrepreneur First, Campfire Lounge 5/F, 42 Wong Chuk Hang Rd, Aberdeen, Hong Kong

This meetup was sponsored by Entrepreneur First - Hong Kong which offered the location. Thanks to them, and in particular to Esther Luong.
[Entrepreneur First - Hong Kong](https://www.joinef.com/cohorts/hong-kong/)
[Esther Luong](https://www.linkedin.com/in/esluong/)

Thanks also to Alan Kwan, Assistant Professor at The University of Hong Kong, for putting me in touch with Yandex engineers.
[Alan Kwan](https://www.linkedin.com/in/kwanalan/)

Ivan Blinkov and his crew from Yandex came to Hong Kong from Russia to present Yandex open-source initiative https://github.com/yandex and in particular ClickHouse https://github.com/yandex/ClickHouse their database management system that allows generating analytical data reports in real time. They will show how ClickHouse integrates with https://catboost.ai/ the famous gradient boosting open-source library, also by Yandex.
[Ivan Blinkov](https://www.linkedin.com/in/ivanblinkov/)
[https://github.com/yandex](https://github.com/yandex)
[https://github.com/yandex/ClickHouse](https://github.com/yandex/ClickHouse)
[https://catboost.ai/](https://catboost.ai/)

The meetup was recorded by Yandex, and can be watched on Youtube.
[The meetup was recorded by Yandex, and can be watched on Youtube](https://www.youtube.com/watch?v=-hI1vDR2oPY&feature=youtu.be)

## Programme:

Note that, as usual, errors and approximations in the summaries below are mine. Especially this time as my understanding of column-oriented databases is unfortunately rather low.

Alexey Milovidov from ClickHouse core developers team at Yandex presented what ClickHouse is, and how does it compares to the other databases. ClickHouse was initially built for Yandex.Metrica, the Russian Google Analytics, which computes and displays reports about website traffic. The user doesn’t want to wait seconds or minutes to consult the report on the metrics of interest, so the queries have to be executed lightning fast. Problem: There are trillions of ‘rows’. Hence ClickHouse as a solution. The basic idea is to transpose the database and consider columns instead of rows since most of the time only a few columns out of the many available columns are needed. On top of that, there are many algorithmic, and more low level, optimizations that Alexey explained that make ClickHouse so fast. ClickHouse first spread inside Yandex to other technical teams and business units, then they decided to open source it.
[Alexey Milovidov](https://www.linkedin.com/in/alexey-milovidov-7b658135/)

Besides the core team of 15 developers at Yandex, there are around 400 contributors who have developed several extensions, e.g. for text analytics, for graph queries. Besides Yandex.Metrix (web traffic monitoring), there are many use cases which are highlighted on the ClickHouse page.
[on the ClickHouse page](https://clickhouse.yandex/)

There, they list some examples of viable applications, and a few of them were mentioned during the fireside chat that followed the main presentations:

His slides on GitHub.
[His slides on GitHub](https://github.com/ClickHouse/clickhouse-presentations/tree/master/meetup31/introduction)

ClickHouse core developer Nikolay Kochetov presented how to do some Machine Learning in ClickHouse. He used some Uber dataset which describes rides in the city of New York for the purpose of illustration. Only using SQL-like requests, he was able to fit and predict from simple linear models to stochastic linear and logistic regressions. It is possible to use CatBoost, another great open sourced Yandex product - a Gradient Boosting model well suited for categorical variables, to predict on data stored in ClickHouse.
[CatBoost](https://catboost.ai/)

Nikolay has a todo list of tasks around more integration of machine learning in ClickHouse. You may get a surprise if you help him. So far, they have accepted all the pull requests.

His slides can be found there.
[there](https://github.com/ClickHouse/clickhouse-presentations/blob/master/meetup31/ml.pdf)

Fireside chat about use cases

A few members of the meetup are users of ClickHouse. They exposed their use cases, and asked questions to Alexey about best practice, roadmap, and new feature integration.

I really enjoyed the talks, despite the topic being out of my technical expertise. This Yandex team is really motivated and listens to its community. They seem eager to support and promote ClickHouse. Attendees asking questions got nice T-shirts, in Russian, which can be loosely translated as “ClickHouse is not slow”.
