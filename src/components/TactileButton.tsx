import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  onTactileClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  children,
  className = '',
  delayMs = 160,
  onClick,
  onTactileClick,
  disabled,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    setIsPressed(true);

    setTimeout(() => {
      setIsPressed(false);
      if (onTactileClick) {
        onTactileClick(e);
      } else if (onClick) {
        onClick(e);
      }
    }, delayMs);
  };

  return (
    <button
      {...props}
      disabled={disabled}
      onClick={handleClick}
      className={`${className} ${isPressed ? 'is-pressed' : ''}`}
    >
      {children}
    </button>
  );
};

interface TactileLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
}

export const TactileLink: React.FC<TactileLinkProps> = ({
  to,
  children,
  className = '',
  delayMs = 160,
  onClick,
  target,
  rel,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (target === '_blank') {
      // External link: allow normal open
      return;
    }

    e.preventDefault();
    setIsPressed(true);

    if (onClick) {
      onClick(e);
    }

    setTimeout(() => {
      setIsPressed(false);
      navigate(to);
    }, delayMs);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      target={target}
      rel={rel}
      className={`${className} ${isPressed ? 'is-pressed' : ''}`}
      {...props}
    >
      {children}
    </a>
  );
};
