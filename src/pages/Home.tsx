import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Shield, PenTool, ArrowRight, CheckCircle2, Users, Award, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=2000" 
            alt="Security and Design" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-red-50 text-primary text-xs font-bold rounded-full mb-6 tracking-wider uppercase">
              Security & Network Construction Specialist
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8">
              안전을 <span className="text-primary">설계</span>하고<br />
              공간의 <span className="text-primary">가치</span>를 더합니다
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
              (주)이안정보통신은 최첨단 CCTV 보안 솔루션과 네트워크 인프라 구축을 통해 
              당신의 비즈니스 환경을 더욱 안전하고 스마트하게 만듭니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary text-center">
                무료 견적 상담받기
              </Link>
              <Link to="/portfolio" className="btn-outline text-center">
                포트폴리오 보기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">우리의 핵심 서비스</h2>
            <p className="text-gray-500">전문 기술력과 창의적인 감각으로 최상의 결과물을 약속합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CCTV Service */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group p-8 bg-gray-50 rounded-3xl border border-gray-100 transition-all hover:shadow-2xl hover:bg-white"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Shield size={28} className="text-primary group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">CCTV 보안 시스템</h3>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                가정, 상가, 공장 등 모든 공간에 최적화된 맞춤형 보안 솔루션을 제공합니다. 
                고화질 카메라 설치부터 실시간 모니터링까지 책임집니다.
              </p>
              <ul className="space-y-2 mb-8">
                {['고화질 IP 카메라', '실시간 원격 모니터링', '24시간 신속 A/S'].map((item) => (
                  <li key={item} className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 size={14} className="text-primary mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/construction" className="inline-flex items-center font-bold text-sm text-primary hover:underline">
                자세히 보기 <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>

            {/* Network Service */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group p-8 bg-gray-50 rounded-3xl border border-gray-100 transition-all hover:shadow-2xl hover:bg-white"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Zap size={28} className="text-primary group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">네트워크 구축</h3>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                안정적이고 빠른 비즈니스 환경을 위한 네트워크 인프라를 구축합니다. 
                무선 WiFi 확장부터 서버실 배선까지 완벽하게 시공합니다.
              </p>
              <ul className="space-y-2 mb-8">
                {['기업용 WiFi 구축', '네트워크 통합 배선', '서버 인프라 관리'].map((item) => (
                  <li key={item} className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 size={14} className="text-primary mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/construction" className="inline-flex items-center font-bold text-sm text-primary hover:underline">
                자세히 보기 <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>

            {/* Access Control Service */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group p-8 bg-gray-50 rounded-3xl border border-gray-100 transition-all hover:shadow-2xl hover:bg-white"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Users size={28} className="text-primary group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">출입통제 시스템</h3>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                지문, 카드, 안면 인식 등 다양한 인증 방식을 통한 철저한 출입 관리를 제공합니다. 
                근태 관리 시스템과 연동하여 효율성을 높입니다.
              </p>
              <ul className="space-y-2 mb-8">
                {['생체 인식 시스템', '스마트 카드 리더', '근태 관리 연동'].map((item) => (
                  <li key={item} className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 size={14} className="text-primary mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/construction" className="inline-flex items-center font-bold text-sm text-primary hover:underline">
                자세히 보기 <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 leading-tight">
                왜 (주)이안정보통신을<br />선택해야 할까요?
              </h2>
              <p className="text-gray-400 mb-12 text-lg leading-relaxed">
                우리는 단순한 시공업체가 아닙니다. 고객의 비즈니스 환경을 분석하고 
                가장 효율적이고 아름다운 솔루션을 제안하는 파트너입니다.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-primary mb-2">10+</span>
                  <span className="text-sm text-gray-400">업력 10년 이상의 노하우</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-primary mb-2">1,500+</span>
                  <span className="text-sm text-gray-400">누적 프로젝트 완료</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-primary mb-2">99%</span>
                  <span className="text-sm text-gray-400">고객 만족도 및 재계약률</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-primary mb-2">24/7</span>
                  <span className="text-sm text-gray-400">철저한 사후 관리 시스템</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: <Users />, title: '전문가 그룹', desc: '각 분야 최고의 기술자와 디자이너가 협업합니다.' },
                { icon: <Zap />, title: '신속한 대응', desc: '문의부터 시공까지 가장 빠른 프로세스를 제공합니다.' },
                { icon: <Award />, title: '품질 보증', desc: '정품 자재 사용과 철저한 검수로 완벽을 기합니다.' },
              ].map((feature, idx) => (
                <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-start space-x-4">
                  <div className="p-3 bg-primary/20 rounded-xl text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            지금 바로 전문가와 상담하세요
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
            고민은 설치를 늦출 뿐입니다. 무료 방문 견적과 디자인 상담을 통해 
            최적의 솔루션을 찾아보세요.
          </p>
          <Link to="/contact" className="inline-block bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
            무료 상담 신청하기
          </Link>
        </div>
      </section>
    </div>
  );
}
