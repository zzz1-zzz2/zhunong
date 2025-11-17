# 农业数据图片与互动剧页面映射表

## 📂 文件结构对应关系

### 当前图片文件（在 `public/images/agricultural-data/` 目录下）：
```
├── data-analysis-chart.svg      ←→ 农业数据分析页面
├── experiment-samples.svg       ←→ 实验样本收集页面  
├── orchard-work-scene.svg     ←→ 病虫害监测页面
├── soil-sensor-device.svg     ←→ 智能灌溉监测页面
├── README.md                  # 使用说明
└── USAGE_GUIDE.md            # 详细指南
```

## 🎯 页面与图片对应关系

| 场景ID | 页面标题 | 对应图片文件 | 图片路径 |
|--------|----------|--------------|----------|
| `pest` | 病虫害监测 | `orchard-work-scene.svg` | `/images/agricultural-data/orchard-work-scene.svg` |
| `irrigation` | 智能灌溉监测 | `soil-sensor-device.svg` | `/images/agricultural-data/soil-sensor-device.svg` |
| `data_monitoring` | 农业数据分析 | `data-analysis-chart.svg` | `/images/agricultural-data/data-analysis-chart.svg` |
| `experiment_samples` | 实验样本收集 | `experiment-samples.svg` | `/images/agricultural-data/experiment-samples.svg` |

## 📝 代码中的引用验证

### ✅ 已正确配置的引用：
```tsx
// 病虫害监测场景
pest: {
  image: '/images/agricultural-data/orchard-work-scene.svg',
}

// 智能灌溉监测场景  
irrigation: {
  image: '/images/agricultural-data/soil-sensor-device.svg',
}

// 农业数据分析场景
data_monitoring: {
  image: '/images/agricultural-data/data-analysis-chart.svg',
}

// 实验样本收集场景
experiment_samples: {
  image: '/images/agricultural-data/experiment-samples.svg',
}
```

## 🔄 故事流程图

```
选址种植(site) 
    ↓
病虫害监测(pest) → 使用 orchard-work-scene.svg
    ↓
智能灌溉监测(irrigation) → 使用 soil-sensor-device.svg
    ↓
农业数据分析(data_monitoring) → 使用 data-analysis-chart.svg
    ↓
实验样本收集(experiment_samples) → 使用 experiment-samples.svg
    ↓
果园采摘(orchard)
```

## 🧪 测试方法

### 1. 验证图片是否存在：
在浏览器中访问：
```
http://localhost:5173/images/agricultural-data/orchard-work-scene.svg
http://localhost:5173/images/agricultural-data/soil-sensor-device.svg
http://localhost:5173/images/agricultural-data/data-analysis-chart.svg
http://localhost:5173/images/agricultural-data/experiment-samples.svg
```

### 2. 验证互动剧流程：
1. 启动项目：`npm run dev`
2. 访问游戏页面
3. 按照故事流程体验新的农业数据监测场景
4. 检查每个场景是否正确显示对应的SVG图片

## 🎨 SVG占位符说明

当前使用的是SVG占位符，它们：
- ✅ 立即显示效果，无需等待图片下载
- ✅ 矢量图形，无限缩放不失真
- ✅ 文件大小小，加载速度快
- ✅ 包含真实的农业数据内容

## 📱 后续替换

当你有真实的豆包AI生成图片时：
1. 将PNG/JPG图片放入同一目录
2. 保持相同的文件名（只改变扩展名）
3. 更新代码中的文件扩展名
4. 或者直接用真实图片替换SVG文件