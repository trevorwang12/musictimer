# HTTPS证书问题排查指南

## 🚨 症状
- 浏览器显示"不安全的网页(HTTPS已遭破坏)"
- 证书错误警告
- 混合内容警告

## 🔍 可能原因

### 1. SSL证书问题
- **域名不匹配**: 证书颁发给不同的域名
- **过期证书**: SSL证书已过期
- **自签名证书**: 使用了浏览器不信任的证书
- **中间证书缺失**: 证书链不完整

### 2. 云平台配置问题
- **CDN配置错误**: CloudFlare、AWS CloudFront等配置不当
- **负载均衡器**: SSL终止配置错误
- **端口配置**: HTTPS端口(443)配置问题

### 3. 域名和DNS问题
- **CNAME记录**: 指向错误的目标
- **A记录**: IP地址不正确
- **TTL设置**: DNS缓存时间过长

## 🛠️ 解决方案

### 立即修复步骤

#### 1. 验证域名配置
```bash
# 检查域名解析
nslookup timerwithmusics.com
dig timerwithmusics.com

# 检查SSL证书
openssl s_client -connect timerwithmusics.com:443 -servername timerwithmusics.com
```

#### 2. 检查部署平台设置
根据您使用的平台：

**Dokploy/Docker部署:**
- 确保反向代理(nginx/traefik)正确配置SSL
- 检查Let's Encrypt证书自动续期
- 验证域名绑定到正确的容器

**Railway:**
```bash
# 检查域名设置
railway domains
# 确保自定义域名正确绑定
```

**Render:**
- 在dashboard中检查Custom Domain设置
- 确认SSL证书状态为"Active"

**Vercel:**
```bash
# 检查域名配置
vercel domains ls
# 重新验证域名
vercel domains verify timerwithmusics.com
```

#### 3. 强制HTTPS重定向
确保以下配置已启用：

**next.config.ts:**
```typescript
// 已配置 ✅
{
  key: 'Strict-Transport-Security',
  value: 'max-age=31536000; includeSubDomains; preload'
}
{
  key: 'Content-Security-Policy', 
  value: '...upgrade-insecure-requests;'
}
```

#### 4. 清除浏览器缓存
```bash
# Chrome开发者工具
1. 打开开发者工具 (F12)
2. 右键刷新按钮
3. 选择"硬性重新加载"

# 或清除特定站点数据
Settings > Privacy and Security > Site Settings > 搜索域名 > Clear data
```

### 平台特定修复

#### Dokploy
1. 检查Traefik配置
2. 确认Let's Encrypt集成
3. 验证域名DNS指向正确IP

#### Railway  
1. 确保域名在Dashboard中正确配置
2. 等待DNS传播(最多24小时)
3. 重新部署服务

#### Render
1. 验证Custom Domain配置
2. 检查DNS设置是否指向Render
3. 等待SSL证书provisioning完成

#### Vercel
1. 重新验证域名所有权
2. 检查DNS记录
3. 可能需要重新添加域名

## 🧪 验证修复

### 在线工具检查
```bash
# SSL检查工具
https://www.ssllabs.com/ssltest/analyze.html?d=timerwithmusics.com

# 混合内容检查
https://mixed-content-checker.herokuapp.com/

# DNS传播检查  
https://dnschecker.org/
```

### 本地验证
```bash
# 检查证书有效性
curl -I https://timerwithmusics.com

# 检查安全头
curl -I https://timerwithmusics.com | grep -E "(Strict|Security|Content)"
```

## 🚀 部署清单

部署前确认：
- [ ] 域名DNS记录正确
- [ ] SSL证书配置完成
- [ ] 代码中所有URL使用HTTPS
- [ ] 安全头配置正确
- [ ] 部署平台域名绑定正确

部署后验证：
- [ ] SSL Labs测试通过(A级以上)
- [ ] 浏览器无安全警告
- [ ] 所有资源正确加载
- [ ] 性能指标正常

## 📞 紧急联系

如果问题持续存在：
1. 检查部署平台status页面
2. 联系平台技术支持
3. 考虑暂时使用平台提供的默认域名

---

**最后更新**: 2025-08-22
**状态**: 代码已修复，等待重新部署验证