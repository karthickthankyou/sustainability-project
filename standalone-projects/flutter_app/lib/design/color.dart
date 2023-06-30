import 'package:flutter/material.dart';

class AppColors {
  static const int primaryValue = 0xff0a9900;
  static const Color primaryColor = Color(primaryValue);
  static const MaterialColor primaryPalette = MaterialColor(
    primaryValue,
    <int, Color>{
      50: Color(0xFFE6F4E8),
      100: Color(0xFFC2E4C3),
      200: Color(0xFF97D298),
      300: Color(0xFF6AC06D),
      400: Color(0xFF46B149),
      500: Color(primaryValue),
      600: Color(0xFF099200),
      700: Color(0xFF078400),
      800: Color(0xFF057700),
      900: Color(0xFF025B00),
    },
  );
}
