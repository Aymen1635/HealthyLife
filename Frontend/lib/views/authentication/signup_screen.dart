import 'package:flutter/material.dart';
import 'package:life_sync/controller/auth_controller.dart';
import 'package:life_sync/views/authentication/form_screen.dart';
import 'package:life_sync/views/authentication/login_screen.dart';
import 'package:life_sync/views/authentication/widgets/my_text_field.dart';

import 'widgets/social_auth_card.dart';

TextEditingController emailController = TextEditingController();
TextEditingController passwordController = TextEditingController();
TextEditingController confirmPasswordController = TextEditingController();
AuthController authController = AuthController();

class SignupScreen extends StatelessWidget {
  const SignupScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Padding(
        padding: const EdgeInsets.only(top: 60.0),
        child: Column(
          children: [
            Image.asset(
              'assets/images/signup.png',
              height: 200.0,
            ),
            const Padding(
              padding: EdgeInsets.only(bottom: 12.0),
              child: Text(
                'Join Us',
                style: TextStyle(
                  fontSize: 24.0,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
            Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
              child: MyTextField(
                keyboardType: TextInputType.emailAddress,
                obscureText: false,
                emailController: emailController,
                text: 'Email',
              ),
            ),
            Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
              child: MyTextField(
                keyboardType: TextInputType.visiblePassword,
                obscureText: true,
                emailController: passwordController,
                text: 'Password',
              ),
            ),
            Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
              child: MyTextField(
                keyboardType: TextInputType.visiblePassword,
                obscureText: true,
                emailController: confirmPasswordController,
                text: 'Password Again',
              ),
            ),
            Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
              child: ElevatedButton(
                onPressed: () {
                  if (emailController.text.isNotEmpty &&
                      passwordController.text.isNotEmpty &&
                      passwordController.text ==
                          confirmPasswordController.text) {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => FormScreen(
                          email: emailController.text,
                          password: passwordController.text,
                        ),
                      ),
                    );
                    /* Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const LoginScreen(),
                      ),
                    ); */
                  } else {
                    showDialog(
                      context: context,
                      builder: (context) => AlertDialog(
                        title: const Text('Mistake'),
                        content: const Text('Passwords dont match!'),
                        actions: [
                          TextButton(
                              onPressed: () {
                                Navigator.pop(context);
                              },
                              child: const Text('Ok'))
                        ],
                      ),
                    );
                  }
                },
                style: ButtonStyle(
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                    RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  padding: MaterialStateProperty.all<EdgeInsetsGeometry>(
                    const EdgeInsets.symmetric(
                        vertical: 14.0, horizontal: 40.0),
                  ),
                ),
                child: const Text(
                  'Sign Up',
                  style: TextStyle(
                    fontSize: 16.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  width: MediaQuery.of(context).size.width * 0.3,
                  child: const Divider(
                    indent: 16.0,
                    endIndent: 16.0,
                    thickness: 1.0,
                  ),
                ),
                const Text('or'),
                SizedBox(
                  width: MediaQuery.of(context).size.width * 0.3,
                  child: const Divider(
                    indent: 16.0,
                    endIndent: 16.0,
                    thickness: 1.0,
                  ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SocialAuthCard(
                    imagePath: 'assets/images/google.png',
                    onPressed: () async {
                      authController.signInWithGoogle();
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const LoginScreen(),
                        ),
                      );
                    },
                  ),
                  const SizedBox(width: 24.0),
                  const SocialAuthCard(
                    imagePath: 'assets/images/facebook.png',
                    onPressed: null,
                  ),
                ],
              ),
            ),
            const Spacer(),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('Already have an account?'),
                  TextButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const LoginScreen(),
                        ),
                      );
                    },
                    child: const Text('Log in'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
