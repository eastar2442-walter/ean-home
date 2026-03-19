import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { OperationType, handleFirestoreError } from '../services/firestoreService';
import { useState } from 'react';
import { CheckCircle2, Send, Phone, Mail, MapPin } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, '성함을 입력해주세요.'),
  contact: z.string().min(10, '연락처를 정확히 입력해주세요.'),
  serviceType: z.string().min(1, '서비스 유형을 선택해주세요.'),
  message: z.string().min(10, '문의 내용을 10자 이상 입력해주세요.'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // 1. Submit to Firebase (Internal Log)
      await addDoc(collection(db, 'contacts'), {
        ...data,
        createdAt: serverTimestamp(),
      });

      // 2. Submit to Formspree
      const response = await fetch('https://formspree.io/f/xojkygej', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Formspree submission failed');
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error('Submission error:', error);
      // Fallback for firestore error handling if it was a firestore error
      if (!(error instanceof Error && error.message === 'Formspree submission failed')) {
        handleFirestoreError(error, OperationType.CREATE, 'contacts');
      } else {
        alert('문의 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">견적 문의</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            궁금하신 점이나 견적 상담이 필요하시면 언제든 문의주세요. 
            전문가가 신속하게 답변해 드립니다.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-8">연락처 정보</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-red-50 rounded-xl text-primary">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">전화번호</p>
                      <p className="font-bold">031-375-8230</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-red-50 rounded-xl text-primary">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">이메일</p>
                      <p className="font-bold">eastar1974@naver.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-red-50 rounded-xl text-primary">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">주소</p>
                      <p className="font-bold">경기도 오산시 밀머리로 64, 다짐프라자 310호</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-ink text-white rounded-3xl">
                <h4 className="font-bold mb-4">상담 가능 시간</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex justify-between"><span>평일</span> <span>09:00 - 18:00</span></li>
                  <li className="flex justify-between"><span>점심시간</span> <span>12:00 - 13:00</span></li>
                  <li className="flex justify-between"><span>주말/공휴일</span> <span>휴무 (온라인 접수 가능)</span></li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-100 p-12 rounded-3xl text-center"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900 mb-4">문의가 정상적으로 접수되었습니다!</h3>
                  <p className="text-green-700 mb-8">확인 후 담당자가 빠른 시일 내에 연락드리겠습니다.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="btn-primary bg-green-600 hover:bg-green-700"
                  >
                    추가 문의하기
                  </button>
                </motion.div>
              ) : (
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">성함/업체명</label>
                        <input 
                          {...register('name')}
                          type="text" 
                          className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                          placeholder="홍길동"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">연락처</label>
                        <input 
                          {...register('contact')}
                          type="text" 
                          className={`w-full px-4 py-3 rounded-xl border ${errors.contact ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                          placeholder="010-1234-5678"
                        />
                        {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">서비스 유형</label>
                      <select 
                        {...register('serviceType')}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.serviceType ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white`}
                      >
                        <option value="">선택해주세요</option>
                        <option value="CCTV 설치">CCTV 설치 및 보안 시스템</option>
                        <option value="네트워크 구축">네트워크 인프라 구축</option>
                        <option value="출입통제 시스템">출입통제 및 근태관리</option>
                        <option value="유지보수">유지보수 및 기타</option>
                      </select>
                      {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">문의 내용</label>
                      <textarea 
                        {...register('message')}
                        rows={6}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none`}
                        placeholder="문의하실 내용을 상세히 적어주세요."
                      ></textarea>
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full btn-primary py-4 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>문의 신청하기</span>
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
