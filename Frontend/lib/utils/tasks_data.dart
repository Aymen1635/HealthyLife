class Task {
  Task({
    required this.title,
    required this.goal,
    this.isCompleted = false,
  });

  String title;
  String goal;
  bool isCompleted;

  static List<Task> tasks = [
    Task(title: "Daily calorie intake", goal: "2344 kcal"),
    Task(title: "calories burned", goal: "250 kcal", isCompleted: true),
    Task(title: "Daily water consumption", goal: "3.5 liters"),
    Task(title: "Steps per day", goal: "10,000 steps"),
    //Task(title: "Günlük uyku süresi", goal: "8 saat", isCompleted: true),
  ];
}
