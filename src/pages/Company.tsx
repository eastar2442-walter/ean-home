import { motion } from 'motion/react';
import { Shield, Target, Eye, Award } from 'lucide-react';

export default function Company() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            회사소개
          </motion.h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            (주)이안정보통신은 고객의 안전과 비즈니스 가치를 최우선으로 생각하는 
            보안 시스템 및 디자인 전문 기업입니다.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
                alt="Office" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8">신뢰와 혁신으로<br />내일을 설계합니다</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                우리는 빠르게 변화하는 기술 환경 속에서 변치 않는 가치를 추구합니다. 
                단순히 기기를 설치하고 그림을 그리는 것을 넘어, 고객이 안심하고 
                비즈니스에만 집중할 수 있는 환경을 조성합니다.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-red-50 rounded-xl text-primary">
                    <Target size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">미션</h4>
                    <p className="text-sm text-gray-500">최첨단 기술과 창의성을 결합하여 안전하고 아름다운 세상을 만듭니다.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-red-50 rounded-xl text-primary">
                    <Eye size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">비전</h4>
                    <p className="text-sm text-gray-500">국내 최고의 보안 및 디자인 통합 솔루션 파트너로 도약합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: '신뢰', desc: '고객과의 약속을 최우선으로 지킵니다.' },
              { title: '전문성', desc: '끊임없는 연구로 최고의 기술력을 유지합니다.' },
              { title: '혁신', desc: '고정관념을 깨는 새로운 솔루션을 제안합니다.' },
              { title: '상생', desc: '고객의 성장이 곧 우리의 성장입니다.' },
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-gray-50 rounded-2xl text-center">
                <h4 className="text-xl font-bold mb-3 text-primary">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
