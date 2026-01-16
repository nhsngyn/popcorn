// src/components/common/IconButton.jsx
import { motion } from "framer-motion";

/**
 * 재사용 가능한 아이콘 버튼 컴포넌트
 * 
 * @param {Object} props
 * @param {Function} props.onPress - 버튼 클릭 핸들러
 * @param {boolean} props.disabled - 비활성화 상태
 * @param {string} props.variant - 색상 테마 ('red', 'green', 'yellow')
 * @param {React.ReactNode} props.icon - 아이콘 (이미지 또는 텍스트)
 * @param {string} props.label - 호버 시 표시될 라벨
 * @param {string} props.labelPosition - 라벨 위치 ('left', 'right')
 * @param {Object} props.animation - Framer Motion 애니메이션 설정
 * @param {string} props.className - 추가 CSS 클래스
 */
const IconButton = ({
  onPress,
  disabled = false,
  variant = "red",
  icon,
  label,
  labelPosition = "left",
  animation = {},
  className = "",
}) => {
  // 색상 테마 설정
  const variants = {
    red: {
      gradient: "from-red-600 to-red-900",
      border: "border-red-400",
      shadow: "shadow-[0_0_20px_rgba(239,68,68,0.5)]",
      hoverShadow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.8)]",
    },
    green: {
      gradient: "from-emerald-600 to-emerald-900",
      border: "border-emerald-400",
      shadow: "shadow-[0_0_20px_rgba(16,185,129,0.5)]",
      hoverShadow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.8)]",
    },
    yellow: {
      gradient: "from-yellow-600 to-yellow-900",
      border: "border-yellow-400",
      shadow: "shadow-[0_0_20px_rgba(234,179,8,0.5)]",
      hoverShadow: "group-hover:shadow-[0_0_30px_rgba(234,179,8,0.8)]",
    },
  };

  const colors = variants[variant] || variants.red;

  // 라벨 위치 스타일
  const labelPositionStyles = {
    left: "-left-2 -translate-x-full pr-2",
    right: "-right-2 translate-x-full pl-2",
  };

  return (
    <motion.button
      onClick={onPress}
      disabled={disabled}
      className={`group relative ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...animation}
    >
      <div
        className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-lg border-2 ${colors.border} ${colors.shadow} ${colors.hoverShadow} flex items-center justify-center transition-all duration-300 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {icon}
      </div>
      
      {label && (
        <span
          className={`absolute top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-wider ${labelPositionStyles[labelPosition]}`}
        >
          {label}
        </span>
      )}
    </motion.button>
  );
};

export default IconButton;
