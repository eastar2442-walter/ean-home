import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Shield, Zap, Users, Search, ExternalLink } from 'lucide-react';
import { OperationType, handleFirestoreError } from '../services/firestoreService';

export default function Portfolio() {
  const [filter, setFilter] = useState<'ALL' | 'CCTV' | 'NETWORK' | 'ACCESS_CONTROL'>('ALL');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'portfolio'));

    return () => unsubscribe();
  }, []);

  const filteredItems = filter === 'ALL' ? items : items.filter(item => item.category === filter);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">포트폴리오</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            (주)이안정보통신이 진행한 다양한 프로젝트 사례를 확인해보세요. 
            신뢰할 수 있는 기술력과 감각적인 디자인을 증명합니다.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 border-b border-gray-100 sticky top-20 bg-white/80 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            {[
              { id: 'ALL', name: '전체보기' },
              { id: 'CCTV', name: 'CCTV 보안', icon: <Shield size={16} /> },
              { id: 'NETWORK', name: '네트워크', icon: <Zap size={16} /> },
              { id: 'ACCESS_CONTROL', name: '출입통제', icon: <Users size={16} /> },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id as any)}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  filter === btn.id 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {btn.icon}
                <span>{btn.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode='popLayout'>
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                          item.category === 'CCTV' ? 'bg-blue-50 text-blue-600' : 
                          item.category === 'NETWORK' ? 'bg-emerald-50 text-emerald-600' : 
                          'bg-amber-50 text-amber-600'
                        }`}>
                          {item.category === 'CCTV' ? 'CCTV' : 
                           item.category === 'NETWORK' ? '네트워크' : '출입통제'}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {item.createdAt?.toDate().toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-white text-center p-6">
                        <Search className="mx-auto mb-2" size={32} />
                        <span className="font-bold text-sm">상세보기</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400">등록된 포트폴리오가 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
