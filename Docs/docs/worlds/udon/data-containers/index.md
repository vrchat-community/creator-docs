---
title: "Data Containers"
sidebar_position: 1
createdAt: "2023-04-24T23:47:52.981Z"
updatedAt: "2023-04-25T00:12:39.357Z"
---
Data Containers store [Data Tokens](/worlds/udon/data-containers/data-tokens) in various different formats, either as a sequential [Data List](/worlds/udon/data-containers/data-lists) or as a key-value pair [Data Dictionary](/worlds/udon/data-containers/data-dictionaries). They are functionally similar to C# Lists and Dictionaries.

DataTokens, in turn, store any other values that you could need. Each token stores one and only one variable, but that could include a whole other DataDictionary or DataList, in order to support nesting.

Additionally, Data Containers are compatible with [VRCJSON](/worlds/udon/data-containers/vrcjson), which allows you to convert data to/from the standard JSON format, which may come from external sources such as [remote string loading](/worlds/udon/string-loading).