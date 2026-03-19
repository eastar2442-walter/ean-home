import { motion } from 'motion/react';
import { Shield, Zap, Users, CheckCircle2, Server, Smartphone, Bell, Clock, Wifi, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Construction() {
  const services = [
    {
      id: 'cctv',
      title: 'CCTV 보안 시스템',
      icon: <Shield size={32} />,
      desc: '고화질 IP 카메라와 지능형 관제 시스템을 통해 24시간 빈틈없는 보안을 제공합니다.',
      features: ['4K UHD 고해상도', '야간 컬러 감시', 'AI 객체 인식', '모바일 실시간 모니터링']
    },
    {
      id: 'network',
      title: '네트워크 구축',
      icon: <Wifi size={32} />,
      desc: '안정적이고 빠른 비즈니스 환경을 위한 최적의 네트워크 인프라를 설계하고 시공합니다.',
      features: ['초고속 기가비트망', '기업용 WiFi 6', '서버실 통합 배선', '네트워크 보안 설정']
    },
    {
      id: 'access',
      title: '출입통제 시스템',
      icon: <Lock size={32} />,
      desc: '지문, 안면 인식 등 최첨단 생체 인증 기술을 활용하여 철저한 출입 관리를 실현합니다.',
      features: ['생체 인식 솔루션', '근태 관리 연동', '원격 도어 제어', '방문객 관리 시스템']
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-32 bg-ink text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?auto=format&fit=crop&q=80&w=1000" alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
              Construction Field
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              미래를 연결하는<br />
              <span className="text-primary">스마트 인프라</span>의 완성
            </h1>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              (주)이안정보통신은 정보통신 공사 전문 면허를 보유한 기업으로서, 
              고객의 비즈니스 환경에 최적화된 통합 솔루션을 제공합니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary px-8 py-4">무료 견적 상담</Link>
              <Link to="/portfolio" className="btn-outline border-white text-white hover:bg-white hover:text-ink px-8 py-4">포트폴리오 보기</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, idx) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}
              >
                <div className="flex-1">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl font-bold mb-6">{service.title}</h2>
                  <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {service.features.map((f, i) => (
                      <div key={i} className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <CheckCircle2 size={16} className="text-primary" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    <img 
                      src={
                        service.id === 'cctv' ? 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800' :
                        service.id === 'network' ? 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800' :
                        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
                      } 
                      alt={service.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">공사 진행 프로세스</h2>
            <p className="text-gray-500">철저한 계획과 완벽한 시공으로 신뢰를 드립니다.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: '상담 및 현장 실사', desc: '고객의 요구사항을 파악하고 현장 환경을 정밀 분석합니다.' },
              { step: '02', title: '설계 및 견적 제안', desc: '최적의 시스템 구성안과 합리적인 견적을 제안합니다.' },
              { step: '03', title: '전문 시공', desc: '숙련된 엔지니어가 규정에 맞게 안전하고 깔끔하게 시공합니다.' },
              { step: '04', title: '검수 및 유지보수', desc: '시공 완료 후 철저한 테스트를 거쳐 사후 관리까지 책임집니다.' },
            ].map((p, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <span className="text-4xl font-bold text-primary/20 mb-4 block">{p.step}</span>
                <h4 className="font-bold mb-3">{p.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
