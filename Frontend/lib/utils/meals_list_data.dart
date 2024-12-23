class MealsListData {
  MealsListData({
    required this.mealType,
    this.imagePath = '',
    this.titleTxt = '',
    this.startColor = '',
    this.endColor = '',
    this.meals,
    this.kacl = 0,
  });

  String imagePath;
  String titleTxt;
  String startColor;
  String endColor;
  List<String>? meals;
  int kacl;
  String mealType;

  static List<MealsListData> tabIconsList = <MealsListData>[
    //ToDo: Burada meal type eklıcem
    MealsListData(
      mealType: 'Breakfast',
      imagePath: 'assets/images/breakfast.png',
      titleTxt: 'Breakfast',
      kacl: 525,
      meals: <String>['Nutritional value:', '800 kcal'],
      startColor: '#FA7D82',
      endColor: '#FFB295',
    ),
    MealsListData(
      mealType: 'Lunch',
      imagePath: 'assets/images/lunch.png',
      titleTxt: 'Lunch',
      kacl: 602,
      meals: <String>['Nutritional value:', '800 kcal'],
      startColor: '#10D8D0',
      endColor: '#20E8B0',
    ),
    MealsListData(
      mealType: 'Snack',
      imagePath: 'assets/images/snack.png',
      titleTxt: 'Snack',
      kacl: 0,
      meals: <String>['Nutritional value:', '800 kcal'],
      startColor: '#FE95B6',
      endColor: '#FF5287',
    ),
    MealsListData(
      mealType: 'Dinner',
      imagePath: 'assets/images/dinner.png',
      titleTxt: 'Dinner',
      kacl: 0,
      meals: <String>['Nutritional value:', '703 kcal'],
      startColor: '#6F72CA',
      endColor: '#1E1466',
    ),
  ];
}
