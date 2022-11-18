namespace CompanyQuery.api
{
    public class Functions
    {
        public static string EvaluateTheAnswers(string answers)
        {
            int points = 0;
            if (answers != null)
            {
                string[] answersList = answers.Split(",");
                for (int i = 0; i < answersList.Length; i++)
                {
                    points += int.Parse(answersList[i]);
                }
                if (points > 4)
                {
                    return "You should implement blockchain options on your LOGISTICS, DATA, PAYMENTS";
                }
                else if (points > 2)
                {
                    return "You should implement blockchain options on your PAYMENTS";
                }
                else
                {
                    return "You should not implement blockchain options";
                }
            }
            return "";
        }

    }
}
