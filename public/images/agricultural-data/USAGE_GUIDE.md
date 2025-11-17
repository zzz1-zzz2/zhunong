# 农业数据图片使用指南

## 📁 图片目录结构
```
public/
├── images/
│   └── agricultural-data/
│       ├── data-analysis-chart.png      # 数据分析表
│       ├── orchard-work-scene.png       # 果园工作场景
│       ├── soil-sensor-device.png       # 土壤传感器设备
│       └── experiment-samples.png       # 实验样本
```

## 🖼️ 图片获取方式

### 方法1：从豆包AI下载
1. 访问豆包AI图片生成器
2. 使用以下提示词生成图片：

#### 数据分析表图片提示词：
```
农业数据监测面板，土壤指标图表，环保纸质数据表，柱状图，现代化农业管理，智能农业化管理系统，专业摄影风格，高清画质
```

#### 果园工作场景提示词：
```
果园工作人员红色背心，圆形白色徽章，数字设备，现代化果园，智能农业设备，专业农业工作场景，高清摄影
```

#### 土壤监测设备提示词：
```
土壤传感器设备，滴灌管线，数字显示屏，现代化农业监测，智能传感器，农业科技，专业设备摄影
```

#### 实验样本提示词：
```
农业实验样本，透明样本袋，白色标签标记，田间试验，样本55和26，现代化农业实验，专业实验场景
```

### 方法2：使用现有图片
如果你有豆包AI生成的原始图片，请：
1. 重命名为指定的文件名
2. 复制到 `public/images/agricultural-data/` 目录
3. 确保文件格式为PNG

## 🔧 在代码中的引用方式

### 在AppleAdventure中使用：
```tsx
image: '/images/agricultural-data/data-analysis-chart.png',
```

### 在普通组件中使用：
```tsx
<img src="/images/agricultural-data/orchard-work-scene.png" alt="果园工作" />
```

## ✅ 验证图片是否正确加载

1. 启动开发服务器：
```bash
npm run dev
```

2. 在浏览器中访问：
```
http://localhost:5173/images/agricultural-data/data-analysis-chart.png
```

3. 如果图片显示正常，说明路径配置正确

## 🎯 当前集成的场景

1. **病虫害监测场景** - 使用 `orchard-work-scene.png`
2. **智能灌溉监测** - 使用 `soil-sensor-device.png`
3. **农业数据分析** - 使用 `data-analysis-chart.png`
4. **实验样本收集** - 使用 `experiment-samples.png`

## 💡 提示

- 确保图片文件名与代码中的引用完全一致
- 建议使用PNG格式以保持图片质量
- 图片尺寸建议为1024x576像素（16:9比例）
- 如果图片加载失败，检查文件路径和文件名拼写