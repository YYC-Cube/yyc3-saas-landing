import { LeLoLogo } from "./lelo-logo"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <LeLoLogo className="mb-4" />
            <p className="text-white/70 mb-4 max-w-md">以前沿的 SaaS 解决方案赋能企业。使用 LeLo 掌控您的成功之路。</p>
            <p className="text-sm text-white/50 italic">"智能驱动业务增长，让每一次决策都更精准"</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">产品</h3>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  产品功能
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  价格方案
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  安全保障
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  集成生态
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">公司</h3>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  关于我们
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  博客
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  加入我们
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  联系我们
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50">
          <p>&copy; 2025 LeLo. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  )
}
