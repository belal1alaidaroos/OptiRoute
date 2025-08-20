using OptiRoute360.Data.Entities;

public class Period : BaseEntity
{
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public string Code { get; set; }
    public int PeriodValue { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
}