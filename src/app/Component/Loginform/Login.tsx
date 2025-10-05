"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error: string | null;
  loading: boolean;
}

const Form: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  error,
  loading,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <StyledWrapper>
      <form className="modern-form" onSubmit={handleSubmit}>
        <div className="form-title">Login</div>
        <div className="form-body">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="input-group">
            <div className="input-wrapper">
              <svg fill="none" viewBox="0 0 24 24" className="input-icon">
                <path
                  strokeWidth="1.5"
                  stroke="currentColor"
                  d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                />
              </svg>
              <input
                required
                placeholder="Email"
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-wrapper">
              <svg fill="none" viewBox="0 0 24 24" className="input-icon">
                <path
                  strokeWidth="1.5"
                  stroke="currentColor"
                  d="M12 10V14M8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8C6 6.89543 6.89543 6 8 6Z"
                />
              </svg>
              <input
                required
                placeholder="Password"
                className="form-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                suppressHydrationWarning
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg fill="none" viewBox="0 0 24 24" className="eye-icon">
                  <path
                    strokeWidth="1.5"
                    stroke="currentColor"
                    d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
                  />
                  <circle
                    strokeWidth="1.5"
                    stroke="currentColor"
                    r={3}
                    cy={12}
                    cx={12}
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="text-right mb-4">
            <Link
              href="/forgot-password"
              className="text-xs font-display font-semibold text-gray-500 hover:text-gray-600 cursor-pointer"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <button className="submit-button" type="submit" disabled={loading}>
          <span className="button-text">
            {loading ? "Logging in..." : "Login"}
          </span>
          <div className="button-glow" />
        </button>
        <div className="form-footer">
          <Link href="/signup" className="login-link">
            Don&apos;t have an account? <span>Sign Up</span>
          </Link>
        </div>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .modern-form {
    --primary: #3b82f6;
    --primary-dark: #2563eb;
    --primary-light: rgba(59, 130, 246, 0.1);
    --success: #10b981;
    --text-main: #1e293b;
    --text-secondary: #64748b;
    --bg-input: #f8fafc;

    position: relative;
    width: 300px;
    padding: 24px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -2px rgba(0, 0, 0, 0.05),
      inset 0 0 0 1px rgba(148, 163, 184, 0.1);
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
  }

  .form-title {
    font-size: 22px;
    font-weight: 600;
    color: var(--text-main);
    margin: 0 0 24px;
    text-align: center;
    letter-spacing: -0.01em;
  }

  .input-group {
    margin-bottom: 16px;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .form-input {
    width: 100%;
    height: 40px;
    padding: 0 36px;
    font-size: 14px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    background: var(--bg-input);
    color: var(--text-main);
    transition: all 0.2s ease;
  }

  .form-input::placeholder {
    color: var(--text-secondary);
  }

  .input-icon {
    position: absolute;
    left: 12px;
    width: 16px;
    height: 16px;
    color: var(--text-secondary);
    pointer-events: none;
  }

  .password-toggle {
    position: absolute;
    right: 12px;
    display: flex;
    align-items: center;
    padding: 4px;
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .eye-icon {
    width: 16px;
    height: 16px;
  }

  .submit-button {
    position: relative;
    width: 100%;
    height: 40px;
    margin-top: 8px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s ease;
  }

  .button-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  .form-footer {
    margin-top: 16px;
    text-align: center;
    font-size: 13px;
  }

  .login-link {
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .login-link span {
    color: var(--primary);
    font-weight: 500;
  }

  /* Hover & Focus States */
  .form-input:hover {
    border-color: #cbd5e1;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary);
    background: white;
    box-shadow: 0 0 0 4px var(--primary-light);
  }

  .password-toggle:hover {
    color: var(--primary);
    transform: scale(1.1);
  }

  .submit-button:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
    box-shadow:
      0 4px 12px rgba(59, 130, 246, 0.25),
      0 2px 4px rgba(59, 130, 246, 0.15);
  }

  .submit-button:hover .button-glow {
    transform: translateX(100%);
  }

  .login-link:hover {
    color: var(--text-main);
  }

  .login-link:hover span {
    color: var(--primary-dark);
  }

  /* Active States */
  .submit-button:active {
    transform: translateY(0);
    box-shadow: none;
  }

  .password-toggle:active {
    transform: scale(0.9);
  }

  /* Validation States */
  .form-input:not(:placeholder-shown):valid {
    border-color: var(--success);
  }

  .form-input:not(:placeholder-shown):valid ~ .input-icon {
    color: var(--success);
  }

  /* Animation */
  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-4px);
    }
    75% {
      transform: translateX(4px);
    }
  }

  .form-input:not(:placeholder-shown):invalid {
    border-color: #ef4444;
    animation: shake 0.2s ease-in-out;
  }

  .form-input:not(:placeholder-shown):invalid ~ .input-icon {
    color: #ef4444;
  }
`;

export default Form;
