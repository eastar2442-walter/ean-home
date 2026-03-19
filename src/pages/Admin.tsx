import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db, auth, signOut } from '../firebase';
import { collection, onSnapshot, query, orderBy, addDoc, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { Shield, LayoutDashboard, Image as ImageIcon, FileText, MessageSquare, LogOut, Plus, Trash2, Edit, ExternalLink, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OperationType, handleFirestoreError } from '../services/firestoreService';

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'posts' | 'contacts'>('portfolio');
  
  // Data States
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  
  // Form States
  const [isAdding, setIsAdding] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({ title: '', category: 'CCTV', description: '', imageUrl: '' });
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '공지사항', imageUrl: '' });

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    if (!isAdmin) return;

    const qPortfolio = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
    const unsubPortfolio = onSnapshot(qPortfolio, (snapshot) => {
      setPortfolio(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'portfolio'));

    const qPosts = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubPosts = onSnapshot(qPosts, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'posts'));

    const qContacts = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const unsubContacts = onSnapshot(qContacts, (snapshot) => {
      setContacts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'contacts'));

    return () => {
      unsubPortfolio();
      unsubPosts();
      unsubContacts();
    };
  }, [isAdmin]);

  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'portfolio'), {
        ...newPortfolio,
        createdAt: serverTimestamp()
      });
      setNewPortfolio({ title: '', category: 'CCTV', description: '', imageUrl: '' });
      setIsAdding(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'portfolio');
    }
  };

  const handleDelete = async (coll: string, id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, coll, id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, coll);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-ink text-white hidden lg:flex flex-col fixed inset-y-0">
        <div className="p-8 flex items-center space-x-3">
          <Shield className="text-primary" />
          <span className="font-bold tracking-tighter">ADMIN PANEL</span>
        </div>
        
        <nav className="flex-grow px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('portfolio')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'portfolio' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <ImageIcon size={20} />
            <span>포트폴리오 관리</span>
          </button>
          <button 
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'posts' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <FileText size={20} />
            <span>게시글 관리</span>
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'contacts' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <MessageSquare size={20} />
            <span>문의 내역</span>
          </button>
        </nav>

        <div className="p-8 border-t border-white/10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
              <img src={user?.photoURL || ''} alt="" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold truncate w-32">{user?.displayName}</span>
              <span className="text-[10px] text-gray-500">Administrator</span>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
            <LogOut size={16} />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-64 p-8">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {activeTab === 'portfolio' && '포트폴리오 관리'}
              {activeTab === 'posts' && '게시글 관리'}
              {activeTab === 'contacts' && '문의 내역 확인'}
            </h1>
            <p className="text-gray-500 text-sm">웹사이트의 콘텐츠를 실시간으로 업데이트하세요.</p>
          </div>
          
          {activeTab !== 'contacts' && (
            <div className="flex space-x-2">
              <button 
                onClick={async () => {
                  if (!window.confirm('샘플 데이터를 추가하시겠습니까?')) return;
                    const samples = [
                      { title: '강남구 아파트 단지 CCTV 구축', category: 'CCTV', description: '300세대 규모 아파트 단지 전구역 고화질 IP 카메라 설치 및 통합 관제 센터 구축', imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800' },
                      { title: '오피스 빌딩 초고속 네트워크 인프라', category: 'NETWORK', description: '전 층 기가비트 이더넷 및 무선 WiFi 6 인프라 구축, 서버실 통합 배선 공사', imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800' },
                      { title: '기업 연구소 지문인식 출입통제 시스템', category: 'ACCESS_CONTROL', description: '보안 구역별 지문 및 안면 인식 리더기 설치, 실시간 출입 기록 관리 시스템 연동', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800' }
                    ];
                  for (const s of samples) {
                    await addDoc(collection(db, 'portfolio'), { ...s, createdAt: serverTimestamp() });
                  }
                  alert('샘플 데이터가 추가되었습니다.');
                }}
                className="btn-outline py-2 px-4 text-xs"
              >
                샘플 데이터 추가
              </button>
              <button 
                onClick={() => setIsAdding(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>새 항목 추가</span>
              </button>
            </div>
          )}
        </header>

        {/* Content Area */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {activeTab === 'portfolio' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">이미지</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">제목</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">카테고리</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">등록일</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {portfolio.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      </td>
                      <td className="px-6 py-4 font-bold text-sm">{item.title}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                          item.category === 'CCTV' ? 'bg-blue-50 text-blue-600' : 
                          item.category === 'NETWORK' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-amber-50 text-amber-600'
                        }`}>
                          {item.category === 'CCTV' ? 'CCTV' : 
                           item.category === 'NETWORK' ? '네트워크' : '출입통제'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.createdAt?.toDate().toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => handleDelete('portfolio', item.id)} className="p-2 text-gray-400 hover:text-primary transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">이름/업체</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">연락처</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">서비스</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">내용</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contacts.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-sm">{item.name}</td>
                      <td className="px-6 py-4 text-sm">{item.contact}</td>
                      <td className="px-6 py-4 text-sm font-medium text-primary">{item.serviceType}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{item.message}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDelete('contacts', item.id)} className="p-2 text-gray-400 hover:text-primary transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 overflow-hidden"
            >
              <h2 className="text-2xl font-bold mb-6">새 포트폴리오 추가</h2>
              <form onSubmit={handleAddPortfolio} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">제목</label>
                  <input 
                    required
                    value={newPortfolio.title}
                    onChange={e => setNewPortfolio({...newPortfolio, title: e.target.value})}
                    type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="프로젝트 제목"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">카테고리</label>
                  <select 
                    value={newPortfolio.category}
                    onChange={e => setNewPortfolio({...newPortfolio, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                    <option value="CCTV">CCTV 보안</option>
                    <option value="NETWORK">네트워크 공사</option>
                    <option value="ACCESS_CONTROL">출입통제 시스템</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">이미지 URL</label>
                  <input 
                    required
                    value={newPortfolio.imageUrl}
                    onChange={e => setNewPortfolio({...newPortfolio, imageUrl: e.target.value})}
                    type="url" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">설명</label>
                  <textarea 
                    value={newPortfolio.description}
                    onChange={e => setNewPortfolio({...newPortfolio, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary h-24 resize-none" 
                    placeholder="상세 설명"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-400 hover:bg-gray-50 transition-colors">취소</button>
                  <button type="submit" className="flex-1 btn-primary py-3">저장하기</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
