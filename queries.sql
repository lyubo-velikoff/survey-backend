SELECT *
FROM  (
    SELECT DISTINCT 1 + trunc(random() * 5100000)::integer AS id
    FROM   generate_series(1, 1100) g
    ) r
JOIN   question USING (id)
LIMIT  1000;

SELECT * FROM question order by RANDOM() LIMIT 3

SELECT "id", "title", "priority", "createdAt", "updatedAt", (
   SELECT
       count(*)
   FROM
       "questionAnswer" AS "QuestionAnswer"
   WHERE
       "QuestionAnswer"."userId" = 1
       AND "QuestionAnswer"."questionId" = "Question"."id"
       AND ("QuestionAnswer"."createdAt" >= date_trunc('week', current_date)
       AND "QuestionAnswer"."createdAt" <= current_timestamp)
   GROUP BY "QuestionAnswer"."userId"
   HAVING COUNT(*)
) AS "questionAnswerCount" FROM "question" AS "Question" 

"
----

SELECT 
    "Answer"."title", "User"."postcode"
FROM 
    "questionAnswer" AS "QuestionAnswer" 
LEFT OUTER JOIN "user" AS "User" 
    ON "QuestionAnswer"."userId" = "User"."id" 
LEFT OUTER JOIN "answer" AS "Answer" 
    ON "QuestionAnswer"."answerId" = "Answer"."id"
WHERE 
    "QuestionAnswer"."questionId" = 12
;


SELECT 
	"Question"."title",
   COUNT(CASE "Answer"."title" WHEN '0 - Not at all' THEN 1 END) as "0 - Not at all",
	COUNT(CASE "Answer"."title" WHEN '1 - Several days' THEN 1 END) as "1 - Several days",
	COUNT(CASE "Answer"."title" WHEN '2 - More than half the days' THEN 1 END) as "2 - More than half the days",
	COUNT(CASE "Answer"."title" WHEN '3 - Nearly every day' THEN 1 END) as "3 - Nearly every day"
FROM 
    "questionAnswer" AS "QuestionAnswer" 
LEFT OUTER JOIN "user" AS "User" 
    ON "QuestionAnswer"."userId" = "User"."id" 
LEFT OUTER JOIN "question" AS "Question" 
    ON "QuestionAnswer"."questionId" = "Question"."id" 
LEFT OUTER JOIN "answer" AS "Answer" 
    ON "QuestionAnswer"."answerId" = "Answer"."id"
WHERE 
  "User"."gender" = 'f'
GROUP BY "Question"."title"


SELECT 
    "User"."postcode", 
    COUNT(CASE "Answer"."title" WHEN '1 - Several days' THEN 1 END) AS "1 - Several days"
FROM
     "questionAnswer" AS "QuestionAnswer" 
LEFT OUTER JOIN "user" AS "User" ON "QuestionAnswer"."userId" = "User"."id" 
LEFT OUTER JOIN "answer" AS "Answer" ON "QuestionAnswer"."answerId" = "Answer"."id"
WHERE 
    "QuestionAnswer"."questionId" = 12
GROUP BY "User"."postcode"


SELECT "User"."postcode", COUNT(CASE "Answer"."title" WHEN '1 - Several days' THEN 1 END)::integer AS "1 - Several days" FROM "questionAnswer" AS "QuestionAnswer" LEFT OUTER JOIN "user" AS "User" ON "QuestionAnswer"."userId" = "User"."id" LEFT OUTER JOIN "answer" AS "Answer" ON "QuestionAnswer"."answerId" = "Answer"."id" WHERE "QuestionAnswer"."questionId" = 12 GROUP BY "User"."postcode" LIMIT 10;


SELECT * FROM "questionAnswer"

SELECT id, title, MIN("mycount") FROM (

) AS "questionAnswerCountStuff"
GROUP BY "questionAnswerCountStuff"."id", "questionAnswerCountStuff"."title"

SELECT * FROM (
	SELECT row_number() over (partition BY id ORDER BY "mycount" desc) AS rownum, * 

) AS "mytest" WHERE rownum = 1

SELECT *, (
	SELECT
       COUNT(*) AS "mycount"
   FROM
       "questionAnswer" AS "QuestionAnswer"
   WHERE
       "QuestionAnswer"."userId" = 1
       AND "QuestionAnswer"."questionId" = "Question"."id"
       AND "QuestionAnswer"."createdAt" >= date_trunc('week', current_date)
       AND "QuestionAnswer"."createdAt" <= CURRENT_TIMESTAMP
) AS "testcount" FROM "question" AS "Question"
ORDER BY "mycount"
WHERE "mycount" = 0

SELECT * FROM (

	) AS "mynumbers"
	WHERE "mynumbers"."mycount" = (SELECT MIN("mynumbers"."mycount") FROM "mynumbers")
) AS "mytest"

-----




SELECT *, min("Question"."questionAnswerCount") FROM (
	SELECT *, (
	   SELECT
	       count(*)
	   FROM
	       "questionAnswer" AS "QuestionAnswer"
	   WHERE
	       "QuestionAnswer"."userId" = 1
	       AND "QuestionAnswer"."questionId" = "Question"."id"
	       AND "QuestionAnswer"."createdAt" >= date_trunc('week', current_date)
	       AND "QuestionAnswer"."createdAt" <= current_timestamp
	) FROM "question" AS "Question"
	GROUP BY "Question"."id"
) AS "questionAnswerCountStuff"

WHERE 
	id IN (
		SELECT DISTINCT "questionId" FROM "questionAnswer" AS "QuestionAnswer"
		 WHERE
	       "QuestionAnswer"."userId" = 1
	       AND "QuestionAnswer"."questionId" = "Question"."id"
	       AND ("QuestionAnswer"."createdAt" >= date_trunc('week', current_date)
	       AND "QuestionAnswer"."createdAt" <= current_timestamp)
	)
	AND priority = 1

HAVING "questionAnswerCount" < 1; 

ORDER BY "questionAnswerCount" DESC
                    
                    
SELECT "userId", "questionId", "answerId", "createdAt", "updatedAt" 
FROM "questionAnswer" AS "QuestionAnswer" 
WHERE 
	"QuestionAnswer"."userId" = 1 
	AND "QuestionAnswer"."createdAt" >= date_trunc('week', current_date);

select date_trunc('week', current_date) as current_week
SELECT CURRENT_TIMESTAMP
SELECT current_date
select date_trunc('week', current_date) - interval '1 day' as current_week
  current_week

SELECT id FROM "public"."question"

SELECT * FROM "public"."questionAnswer"




SELECT EXTRACT(YEAR FROM AGE(CAST (TIMESTAMP '1990-01-01' AS DATE))) AS "age";

SELECT COUNT(*) AS "total" FROM "questionAnswerView"


SELECT 
	"Question"."title",
	EXTRACT(YEAR FROM AGE(CAST (TIMESTAMP '1990-01-01' AS DATE))) AS "age"
   COUNT(CASE "Answer"."title" WHEN '0 - Not at all' THEN 1 END) as "0 - Not at all",
--	COUNT(CASE "Answer"."title" WHEN '1 - Several days' THEN 1 END) as "1 - Several days",
--	COUNT(CASE "Answer"."title" WHEN '2 - More than half the days' THEN 1 END) as "2 - More than half the days",
--	COUNT(CASE "Answer"."title" WHEN '3 - Nearly every day' THEN 1 END) as "3 - Nearly every day"
FROM 
    "questionAnswer" AS "QuestionAnswer" 
LEFT OUTER JOIN "user" AS "User" 
    ON "QuestionAnswer"."userId" = "User"."id" 
LEFT OUTER JOIN "question" AS "Question" 
    ON "QuestionAnswer"."questionId" = "Question"."id" 
LEFT OUTER JOIN "answer" AS "Answer" 
    ON "QuestionAnswer"."answerId" = "Answer"."id"
WHERE 
  "User"."gender" = 'f'
GROUP BY "Question"."title"


SELECT
   SUM(CASE WHEN "QuestionAnswerView"."age" < 18 THEN 1 ELSE 0 END) AS "Less < 18"
FROM 
   "questionAnswerView" as "QuestionAnswerView"



SELECT
   SUM(CASE WHEN ("QuestionAnswerView"."age" between 0 and 9) THEN 1 ELSE 0 END)::integer AS "Age range 0 - 9",
   SUM(CASE WHEN ("QuestionAnswerView"."age" between 10 and 19) THEN 1 ELSE 0 END)::integer AS "Age range 10 - 19",
   SUM(CASE WHEN ("QuestionAnswerView"."age" between 20 and 29) THEN 1 ELSE 0 END)::integer AS "Age range 20 - 29",
   SUM(CASE WHEN ("QuestionAnswerView"."age" between 30 and 39) THEN 1 ELSE 0 END)::integer AS "Age range 30 - 39",
   SUM(CASE WHEN ("QuestionAnswerView"."age" between 40 and 49) THEN 1 ELSE 0 END)::integer AS "Age range 40 - 49",
   SUM(CASE WHEN ("QuestionAnswerView"."age" between 50 and 59) THEN 1 ELSE 0 END)::integer AS "Age range 50 - 59",
   SUM(CASE WHEN ("QuestionAnswerView"."age" between 60 and 69) THEN 1 ELSE 0 END)::integer AS "Age range 60 - 69",
   SUM(CASE WHEN ("QuestionAnswerView"."age" between 70 and 79) THEN 1 ELSE 0 END)::integer AS "Age range 70 - 79",
   SUM(CASE WHEN "QuestionAnswerView"."age" >= 80 THEN 1 ELSE 0 END)::integer AS "Age range 80+"
FROM
   "questionAnswerView" as "QuestionAnswerView"


SELECT
                "QuestionAnswerView"."answerTitle",
                SUM(CASE WHEN ("QuestionAnswerView"."age" between 0 and 9) THEN 1 ELSE 0 END)::integer AS "Age range 0 - 9",
                SUM(CASE WHEN ("QuestionAnswerView"."age" between 10 and 19) THEN 1 ELSE 0 
END)::integer AS "Age range 10 - 19",
                SUM(CASE WHEN ("QuestionAnswerView"."age" between 20 and 29) THEN 1 ELSE 0 
END)::integer AS "Age range 20 - 29",
                SUM(CASE WHEN ("QuestionAnswerView"."age" between 30 and 39) THEN 1 ELSE 0 
END)::integer AS "Age range 30 - 39",
                SUM(CASE WHEN ("QuestionAnswerView"."age" between 40 and 49) THEN 1 ELSE 0 
END)::integer AS "Age range 40 - 49",
                SUM(CASE WHEN ("QuestionAnswerView"."age" between 50 and 59) THEN 1 ELSE 0 
END)::integer AS "Age range 50 - 59",
                SUM(CASE WHEN ("QuestionAnswerView"."age" between 60 and 69) THEN 1 ELSE 0 
END)::integer AS "Age range 60 - 69",
                SUM(CASE WHEN ("QuestionAnswerView"."age" between 70 and 79) THEN 1 ELSE 0 
END)::integer AS "Age range 70 - 79",
                SUM(CASE WHEN "QuestionAnswerView"."age" >= 80 THEN 1 ELSE 0 END)::integer 
AS "Age range 80+"
            FROM
                "questionAnswerView" as "QuestionAnswerView"
            GROUP BY "QuestionAnswerView"."answerTitle"



---
0 6
1 5
2 2
3 3

SELECT "questionAnswerView"."answerTitle", COUNT(*) AS "total" FROM "questionAnswerView"
WHERE "questionAnswerView"."age" BETWEEN 20 AND 29
GROUP BY "questionAnswerView"."answerTitle"


SELECT * FROM (
	SELECT
	    "QuestionAnswerView"."answerTitle",
	    SUM(CASE WHEN ("QuestionAnswerView"."age" between 0 and 9) THEN 1 ELSE 0 END)::integer AS "Age range0 - 9",
	    SUM(CASE WHEN ("QuestionAnswerView"."age" between 10 and 19) THEN 1 ELSE 0 END)::integer AS "Age range10 - 19",
	    SUM(CASE WHEN ("QuestionAnswerView"."age" between 20 and 29) THEN 1 ELSE 0 END)::integer AS "Age range20 - 29",
	    SUM(CASE WHEN ("QuestionAnswerView"."age" between 30 and 39) THEN 1 ELSE 0 END)::integer AS "Age range30 - 39",
	    SUM(CASE WHEN ("QuestionAnswerView"."age" between 40 and 49) THEN 1 ELSE 0 END)::integer AS "Age range40 - 49",
	    SUM(CASE WHEN ("QuestionAnswerView"."age" between 50 and 59) THEN 1 ELSE 0 END)::integer AS "Age range50 - 59",
	    SUM(CASE WHEN ("QuestionAnswerView"."age" between 60 and 69) THEN 1 ELSE 0 END)::integer AS "Age range60 - 69",
	    SUM(CASE WHEN ("QuestionAnswerView"."age" between 70 and 79) THEN 1 ELSE 0 END)::integer AS "Age range70 - 79",
	    SUM(CASE WHEN "QuestionAnswerView"."age" >= 80 THEN 1 ELSE 0 END)::integer AS "Age range 80+"
	FROM
	    "questionAnswerView" as "QuestionAnswerView"
	GROUP BY "QuestionAnswerView"."answerTitle"
) AS "answers"
GROUP BY "QuestionAnswerView"."answerTitle", "answers"."Age range0 - 9"


SELECT "questionAnswerView"."answerTitle", COUNT(*) AS "total" FROM "questionAnswerView"
WHERE "questionAnswerView"."age" BETWEEN 30 AND 39
GROUP BY "questionAnswerView"."answerTitle"

6 5 2 3


4 5 7 6

SELECT 
	CASE
		WHEN "QuestionAnswerView"."age" BETWEEN 0 AND 9 THEN '10-9'
		WHEN "QuestionAnswerView"."age" BETWEEN 10 AND 19 THEN '10-19'
		WHEN "QuestionAnswerView"."age" BETWEEN 20 AND 29 THEN '20-29'
		WHEN "QuestionAnswerView"."age" BETWEEN 30 AND 39 THEN '30-39'
		WHEN "QuestionAnswerView"."age" BETWEEN 40 AND 49 THEN '40-49'
		WHEN "QuestionAnswerView"."age" BETWEEN 50 AND 59 THEN '50-59'
		WHEN "QuestionAnswerView"."age" BETWEEN 60 AND 69 THEN '60-69'
      WHEN "QuestionAnswerView"."age" BETWEEN 70 AND 79 THEN '70-79'
		WHEN "QuestionAnswerView"."age" >= 80 THEN '80+'
	END AS "ageRange", 
   COUNT(CASE "answerTitle" WHEN '0 - Not at all' THEN 1 END) AS "0 - Not at all",
	COUNT(CASE "answerTitle" WHEN '1 - Several days' THEN 1 END) AS "1 - Several days",
	COUNT(CASE "answerTitle" WHEN '2 - More than half the days' THEN 1 END) AS "2 - More than half the days",
	COUNT(CASE "answerTitle" WHEN '3 - Nearly every day' THEN 1 END) AS "3 - Nearly every day"
FROM 
	"questionAnswerView" as "QuestionAnswerView"
GROUP BY "ageRange"
ORDER BY "ageRange"

SELECT * FROM 

SELECT * FROM "user" WHERE "name" = 'Lyubo'

SELECT to_char(date_trunc('week', "QuestionAnswerView"."createdAt"), 'DD/MM/YYYY') AS "week",
	   AVG(COUNT(CASE "answerTitle" WHEN '0 - Not at all' THEN 1 END)) AS "0 - Not at all",
		AVG(COUNT(CASE "answerTitle" WHEN '1 - Several days' THEN 1 END)) AS "1 - Several days",
		AVG(COUNT(CASE "answerTitle" WHEN '2 - More than half the days' THEN 1 END)) AS "2 - More than half the days",
		AVG(COUNT(CASE "answerTitle" WHEN '3 - Nearly every day' THEN 1 END)) AS "3 - Nearly every day"
FROM 
	"questionAnswerView" as "QuestionAnswerView"
GROUP BY "week"
ORDER BY "week";

SELECT
	"week",
	AVG("0 - Not at all")::NUMERIC(10,2) AS "0 - Not at all",
	AVG("1 - Several days")::NUMERIC(10,2) AS "1 - Several days",
	AVG("2 - More than half the days")::NUMERIC(10,2) AS "2 - More than half the days",
	AVG("3 - Nearly every day")::NUMERIC(10,2) AS "3 - Nearly every day"
FROM (
	SELECT 
		to_char(date_trunc('week', "QuestionAnswerView"."createdAt"), 'DD/MM/YYYY') AS "week",
	   COUNT(CASE "answerTitle" WHEN '0 - Not at all' THEN 1 END) AS "0 - Not at all",
		COUNT(CASE "answerTitle" WHEN '1 - Several days' THEN 1 END) AS "1 - Several days",
		COUNT(CASE "answerTitle" WHEN '2 - More than half the days' THEN 1 END) AS "2 - More than half the days",
		COUNT(CASE "answerTitle" WHEN '3 - Nearly every day' THEN 1 END) AS "3 - Nearly every day"
	FROM 
		"questionAnswerView" as "QuestionAnswerView"
	GROUP BY "week"
	ORDER BY "week"
) AS "countedAnswers"
GROUP BY "week"
ORDER BY "week"

	SELECT 
		to_char(date_trunc('week', "QuestionAnswerView"."createdAt"), 'DD/MM/YYYY') AS "week",
	   AVG(CASE "answerTitle" WHEN '0 - Not at all') AS "0 - Not at all",
		AVG(CASE "answerTitle" WHEN '1 - Several days' THEN 1 END) AS "1 - Several days",
		AVG(CASE "answerTitle" WHEN '2 - More than half the days' THEN 1 END) AS "2 - More than half the days",
		AVG(CASE "answerTitle" WHEN '3 - Nearly every day' THEN 1 END) AS "3 - Nearly every day"
	FROM 
		"questionAnswerView" as "QuestionAnswerView"
	GROUP BY "week"
	ORDER BY "week"



	   COUNT(CASE "answerTitle" WHEN '0 - Not at all' THEN 1 END) / 5 AS "0 - Not at all",
		COUNT(CASE "answerTitle" WHEN '1 - Several days' THEN 1 END) / 5 AS "1 - Several days",
		COUNT(CASE "answerTitle" WHEN '2 - More than half the days' THEN 1 END) / 5 AS "2 - More than half the days",
		COUNT(CASE "answerTitle" WHEN '3 - Nearly every day' THEN 1 END) / 5 AS "3 - Nearly every day"
		to_char(date_trunc('week', "QuestionAnswerView"."createdAt"), 'DD/MM/YYYY') AS "week",
	SELECT 
		"answerTitle",
		COUNT(*) AS "counted"
	FROM 
		"questionAnswerView" as "QuestionAnswerView"
	GROUP BY "answerTitle"
	ORDER BY "answerTitle"
	
-- Avg answers by answer type 0,1,2,3 by week	
SELECT 
	to_char(date_trunc('week', "QuestionAnswerView"."createdAt"), 'DD/MM/YYYY') AS "week",
	AVG(CASE "answerId" WHEN 1 THEN 1 ELSE 0 END)::NUMERIC(10,2) AS "0 - Not at all",
	AVG(CASE "answerId" WHEN 2 THEN 1 ELSE 0 END)::NUMERIC(10,2) AS "1 - Several days",
	AVG(CASE "answerId" WHEN 3 THEN 1 ELSE 0 END)::NUMERIC(10,2) AS "2 - More than half the days",
	AVG(CASE "answerId" WHEN 4 THEN 1 ELSE 0 END)::NUMERIC(10,2) AS "3 - Nearly every day"
FROM 
	"questionAnswerView" as "QuestionAnswerView" 
GROUP BY "week"
ORDER BY "week"

SELECT 
	to_char(date_trunc('week', "QuestionAnswerView"."createdAt"), 'DD/MM/YYYY') AS "week",
   COUNT(CASE "answerTitle" WHEN '0 - Not at all' THEN 1 END) AS "0 - Not at all",
	COUNT(CASE "answerTitle" WHEN '1 - Several days' THEN 1 END) AS "1 - Several days",
	COUNT(CASE "answerTitle" WHEN '2 - More than half the days' THEN 1 END) AS "2 - More than half the days",
	COUNT(CASE "answerTitle" WHEN '3 - Nearly every day' THEN 1 END) AS "3 - Nearly every day"
FROM 
	"questionAnswerView" as "QuestionAnswerView"
GROUP BY "week"
ORDER BY "week"

SELECT 
	to_char(date_trunc('week', "QuestionAnswerView"."createdAt"), 'DD/MM/YYYY') AS "week",
	AVG(DISTINCT "userId") AS "0 - Not at all"
FROM 
	"questionAnswerView" as "QuestionAnswerView" 
GROUP BY "week"
ORDER BY "week"

SELECT 
	to_char(date_trunc('week', "QuestionAnswerView"."createdAt"), 'DD/MM/YYYY') AS "week",
	AVG(DISTINCT CASE "answerTitle" WHEN '0 - Not at all' THEN "userId" ELSE 0 END)::NUMERIC(10,2) AS "0 - Not at all",
	AVG(DISTINCT CASE "answerTitle" WHEN '1 - Several days' THEN "userId" ELSE 0 END)::NUMERIC(10,2) AS "1 - Several days",
	AVG(DISTINCT CASE "answerTitle" WHEN '2 - More than half the days' THEN "userId" ELSE 0 END)::NUMERIC(10,2) AS "2 - More than half the days",
	AVG(DISTINCT CASE "answerTitle" WHEN '3 - Nearly every day' THEN "userId" ELSE 0 END)::NUMERIC(10,2) AS "3 - Nearly every day"
FROM 
	"questionAnswerView" as "QuestionAnswerView"
GROUP BY "week"
ORDER BY "week"


SELECT 
	AVG(DISTINCT "userId") AS "0 - not at all"
FROM 
	"questionAnswerView" as "QuestionAnswerView"
WHERE
	"createdAt" BETWEEN '2020-07-13 00:00:00.00+00' AND '2020-07-19 23:59:59.00+00'
	AND "answerId" = 2

-- 13/07/2020 avg 11.37

, (
			SELECT 
				COUNT(DISTINCT to_char(date_trunc('week', "QuestionAnswerView"."createdAt"), 'DD/MM/YYYY'))::integer AS "numOfWeeks"
			FROM 
				"questionAnswerView" as "QuestionAnswerView"
		) AS "weeks"

	GROUP BY "week"

---






SELECT
    "QuestionAnswerView"."answerTitle",
    SUM(CASE WHEN ("QuestionAnswerView"."age" between 0 and 9) THEN 1 ELSE 0 END)::integer AS "Age range0 - 9",
    SUM(CASE WHEN ("QuestionAnswerView"."age" between 10 and 19) THEN 1 ELSE 0 END)::integer AS "Age range10 - 19",
    SUM(CASE WHEN ("QuestionAnswerView"."age" between 20 and 29) THEN 1 ELSE 0 END)::integer AS "Age range20 - 29",
    SUM(CASE WHEN ("QuestionAnswerView"."age" between 30 and 39) THEN 1 ELSE 0 END)::integer AS "Age range30 - 39",
    SUM(CASE WHEN ("QuestionAnswerView"."age" between 40 and 49) THEN 1 ELSE 0 END)::integer AS "Age range40 - 49",
    SUM(CASE WHEN ("QuestionAnswerView"."age" between 50 and 59) THEN 1 ELSE 0 END)::integer AS "Age range50 - 59",
    SUM(CASE WHEN ("QuestionAnswerView"."age" between 60 and 69) THEN 1 ELSE 0 END)::integer AS "Age range60 - 69",
    SUM(CASE WHEN ("QuestionAnswerView"."age" between 70 and 79) THEN 1 ELSE 0 END)::integer AS "Age range70 - 79",
    SUM(CASE WHEN "QuestionAnswerView"."age" >= 80 THEN 1 ELSE 0 END)::integer AS "Age range 80+"
FROM
    "questionAnswerView" as "QuestionAnswerView"
GROUP BY "QuestionAnswerView"."answerTitle"



SELECT 
	DISTINCT "public"."question"."title", *
FROM (
	SELECT questionAnswerquestionAnswer
		"public"."question"."id", "public"."user"."name", "public"."question"."title", "public"."answer"."title", "public"."question"."priority", "public"."questionAnswer"."createdAt"
	FROM 
		"public"."questionAnswer"
	LEFT JOIN "public"."user" ON "public"."questionAnswer"."userId" = "public"."user"."id"
	LEFT JOIN "public"."answer" ON "public"."questionAnswer"."answerId" = "public"."answer"."id"
	LEFT JOIN "public"."question" ON "public"."questionAnswer"."questionId" = "public"."question"."id"
	WHERE
		"public"."questionAnswer"."createdAt" >= (select date_trunc('week', current_date) as current_week)
		AND "public"."questionAnswer"."createdAt" < CURRENT_TIMESTAMP
		AND "public"."question"."priority" = 1
	ORDER BY RANDOM()
	LIMIT 100
) AS "questions"



INSERT INTO 
	"questionAnswer" ("userId","questionId","answerId","createdAt","updatedAt") 
VALUES ($1,$2,$3,$4,$5) RETURNING "userId","questionId","answerId","createdAt","updatedAt";    

Executing (default): SELECT "id", "name", "gender", "postcode", "dob", "createdAt", "updatedAt" FROM "user" AS "User" WHERE "User"."id" questionAnswerquestionAnswer= '1';


SELECT "Answer"."answer", "User"."name", "User"."gender", "User"."postcode", "Answer"."title", EXTRACT(YEAR FROM AGE(CAST ("User"."dob" AS DATE))) AS "age" FROM "questionAnswer" AS "QuestionAnswer" LEFT OUTER JOIN "user" AS "User" ON "QuestionAnswer"."userId" = "User"."id" LEFT OUTER JOIN "answer" AS "Answer" ON "QuestionAnswer"."answerId" = "Answer"."id" WHERE "User"."gender" = 'm' AND "QuestionAnswer"."questionId" = 12;

SELECT 
	to_char(date_trunc('week', "QuestionAnswerView"."createdAt"), 'DD/MM/YYYY') AS "week",
	AVG(DISTINCT CASE "answerTitle" WHEN '0 - Not at all' THEN "userId" ELSE 0 END)::NUMERIC(10,2) AS "0 - Not at all",
	AVG(DISTINCT CASE "answerTitle" WHEN '1 - Several days' THEN "userId" ELSE 0 END)::NUMERIC(10,2) AS "1 - Several days",
	AVG(DISTINCT CASE "answerTitle" WHEN '2 - More than half the days' THEN "userId" ELSE 0 END)::NUMERIC(10,2) AS "2 - More than half the days",
	AVG(DISTINCT CASE "answerTitle" WHEN '3 - Nearly every day' THEN "userId" ELSE 0 END)::NUMERIC(10,2) AS "3 - Nearly every day"
FROM 
	"questionAnswerView" as "QuestionAnswerView"
GROUP BY "week"
ORDER BY "week"


SELECT 
	"userName",
	AVG(DISTINCT "userId")::NUMERIC(10,2) AS "0 - Not at all"
FROM "questionAnswerView" as "QuestionAnswerView"
WHERE
	"QuestionAnswerView"."answerTitle" = '0 - Not at all'
GROUP BY "userName"
ORDER BY "userName"

SELECT 
	AVG(DISTINCT "userId") AS "0 - not at all"
FROM 
	"questionAnswerView" as "QuestionAnswerView"
WHERE
	"answerTitle" = '0 - Not at all'
GROUP BY "userName"


SELECT timestamp, close, stddev(close) OVER (ORDER BY timestamp ASC ROWS 24 PRECEDING) 
  FROM candles WHERE product='XRP/USDT' AND interval='1h' ORDER BY timestamp;



SELECT 
	"userId",
	AVG(DISTINCT CASE "answerTitle" WHEN '0 - Not at all' THEN "userId" ELSE 0 END)::NUMERIC(10,2) AS "0 - Not at all",
	AVG(DISTINCT CASE "answerTitle" WHEN '1 - Several days' THEN "userId" ELSE 0 END)::NUMERIC(10,2) AS "1 - Several days",
	AVG(DISTINCT CASE "answerTitle" WHEN '2 - More than half the days' THEN "userId" ELSE 0 END)::NUMERIC(10,2) AS "2 - More than half the days",
	AVG(DISTINCT CASE "answerTitle" WHEN '3 - Nearly every day' THEN "userId" ELSE 0 END)::NUMERIC(10,2) AS "3 - Nearly every day"
FROM 
	"questionAnswerView" as "QuestionAnswerView"
GROUP BY "userId"

SELECT 
	"userName",
	COUNT(*) AS "total",
	AVG("userId") AS "avg_count"
FROM
	"questionAnswerView" as "QuestionAnswerView"
WHERE 
	"answerTitle" = '0 - Not at all'
GROUP BY "userName"



SELECT "userName", STDDEV_POP("avg_count")
FROM (
	SELECT 
		"userName",
		COUNT(*) AS "total",
		AVG("id") AS "avg_count"
	FROM
		"questionAnswerView" as "QuestionAnswerView"
	WHERE 
		"answerTitle" = '0 - Not at all'
	GROUP BY "userName"
) AS "qa"
GROUP BY "userName"



SELECT STDDEV("id") AS "standard_dev"
FROM "user"

SELECT STDDEV("0 - Not at all") FROM (
	SELECT 
		"userName",
		count(CASE "answerTitle" WHEN '0 - Not at all' THEN "userId" ELSE 0 END) AS "0 - Not at all"
	FROM 
		"questionAnswerView" as "QuestionAnswerView"
	GROUP BY "userName"
) AS "asd"


SELECT SUM("counted") / COUNT("userId") AS "mean" FROM (
	SELECT 
		"userId",
		COUNT(*) AS "counted"
	FROM 
		"questionAnswerView" as "QuestionAnswerView"
	WHERE
		"QuestionAnswerView"."answerTitle" = '0 - Not at all'
	GROUP BY
		"userId"
) AS "temp"




SELECT 
	"userName",
FROM 
	"questionAnswerView" as "QuestionAnswerView"
WHERE
	
		
SELECT 
	"mean" - "std" AS "standard-below-mean",
	"mean" + "std" AS "standard-above-mean"
FROM (
	SELECT 
		STDDEV_POP("counted") AS "std", 
		SUM("counted") / COUNT(DISTINCT "userName") AS "mean"
	FROM (
		SELECT 
			"userName",
			COUNT(*) AS "counted"
		FROM 
			"questionAnswerView" as "QuestionAnswerView"
		WHERE
			"QuestionAnswerView"."answerTitle" = '0 - Not at all'
		GROUP BY
			"userName"
	) AS "temp"
) AS "results"



CREATE OR REPLACE FUNCTION get_all () RETURNS TABLE (
        learn_id INT,
        learn_title VARCHAR
) AS $$
BEGIN
    RETURN QUERY SELECT
        "id",
        "title"
    FROM
        "question";
END ; $$ LANGUAGE 'plpgsql';


-- PROCEDURE: public.get_questions()

-- DROP PROCEDURE public.get_questions();

CREATE OR REPLACE PROCEDURE public.get_questions()
LANGUAGE 'sql'
AS $BODY$
SELECT * FROM "question";
$BODY$;

 
CALL get_questions();

	
	select 
	*
from (
	SELECT 
		"userName",
		COUNT(*) AS "counted"
	FROM 
		"questionAnswerView" as "QuestionAnswerView"
	WHERE
		"QuestionAnswerView"."answerTitle" = '0 - Not at all'
	GROUP BY
		"userName"
) as "temp"
where
	"counted" between (select "standard-below-mean" from get_stdv()) and (select "standard-above-mean" from get_stdv())

	
	
SELECT S


-- STANDARD DEVIATION
select 
	*
from (
	SELECT 
		"userName",
		COUNT(*) AS "counted"
	FROM 
		"questionAnswerView" as "QuestionAnswerView"
	WHERE
		"QuestionAnswerView"."answerTitle" = '0 - Not at all'
	GROUP BY
		"userName"
) as "temp"
where
	"counted" between (select "standard-below-mean" from get_stdv()) and (select "standard-above-mean" from get_stdv())
