/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Megaphone, 
  Users, 
  Camera, 
  BookOpen, 
  Music, 
  Search,
  ChevronRight,
  ExternalLink,
  Heart,
  Calendar,
  Clock,
  User,
  Mail,
  Inbox,
  AlertCircle,
  FileText,
  ArrowRight,
  Quote,
  XCircle
} from 'lucide-react';

// --- Data ---

const NOTICES = [
  { id: 1, title: '[공지] 2008학년도 제1차 돤카오(段考) 일정 안내', date: '2008.09.15', author: '교무처' },
  { id: 2, title: '[안내] 방송부 점심 라디오 사연 모집 (DJ 장위안)', date: '2008.09.12', author: '방송부' },
  { id: 3, title: '[필독] 교내 바이크 반입 금지 및 복장 규정 준수', date: '2008.09.10', author: '학생처' },
  { id: 4, title: '[행사] 제12회 자운고등학교 체육대회 종목 신청', date: '2008.09.05', author: '학생회' },
  { id: 5, title: '[동아리] 천문부 신입 부원 추가 모집 안내', date: '2008.09.01', author: '천문부' },
];

const CHARACTERS = [
  {
    id: 'tao',
    name: '뤄천타오 (Luò Chéngtáo / 羅承濤)',
    birth: '07.22',
    class: '2학년 11반',
    club: '천문부',
    height: '192cm',
    mbti: 'ESTP-A (8w7)',
    image: '/assets/tao.png',
    desc: '뺨에 칼자국 흉터+왼쪽 무릎 수술 흉터',
    family: '죽은 형 有, 부잣집, 양친 맞벌이',
    features: '바이크 등하교, 수업 안 들음, MP3 항시 소지, 농구 선출 출신, 연애 생각 ❌, 동정 모솔',
    nicknames: '아명: 아타오(阿濤) / 멸칭: 펑런(瘋人)',
    likes: '바이크, 밤',
    dislikes: '농구, 바다',
  },
  {
    id: 'yuan',
    name: '장위안 (Zhāng Yǔ\'ān / 張予安)',
    birth: '08.21',
    class: '2학년 1반',
    club: '방송부',
    height: '183cm',
    mbti: 'INFJ-T (9w1)',
    image: '/assets/yuan.png',
    desc: '왼쪽 눈 밑 아래 점+오른쪽 볼 점.',
    family: '조모(유일한 보호자)',
    features: '전교 1등, 방송부 아나운서, 주말 알바(음식점)',
    nicknames: '아명: 안안(安安)',
    likes: '참치, 바다, 하늘',
    dislikes: '산, 텁텁한 공기',
  }
];

const ACADEMIC_CALENDAR = [
  { term: '1학기', events: [
    { m: '9월', e: '개학식 & 3학년 1차 모의고사' },
    { m: '10월 중순', e: '1차 돤카오(段考) & 쌍십절 휴교' },
    { m: '10월 말', e: '3학년 2차 모의고사, 1-2학년 모의고사' },
    { m: '11월 중', e: '체육대회' },
    { m: '11월 말', e: '2차 돤카오(段考)' },
    { m: '12월 중', e: '3학년 3차 모의고사' },
    { m: '12월 말', e: '학교 축제' },
    { m: '1월 중', e: '3차 돤카오(段考)' },
    { m: '1월 말', e: '3학년의 학측고사 & 겨울방학' },
  ]},
  { term: '2학기', events: [
    { m: '2월 중순', e: '개학 & 원소절' },
    { m: '2월 말', e: '학측 성적 발표' },
    { m: '3월 초', e: '대학 신청' },
    { m: '3월 중', e: '개교기념일' },
    { m: '3월 말', e: '1차 돤카오(段考)' },
    { m: '4월 초', e: '청명절 연휴' },
    { m: '4월 중', e: '3학년의 고사 대학 면접/실기시험' },
    { m: '5월 초', e: '2차 돤카오(段考)' },
    { m: '5월 중', e: '대학 합격 발표, 2학년 삐뤼(畢旅)' },
    { m: '5월 말', e: '3학년 졸업고사' },
    { m: '6월 초', e: '3학년 졸업식' },
    { m: '6월 말', e: '1-2학년들 3차 돤카오(段考) & 종업식 & 여름방학' },
    { m: '7월 초', e: '3학년 분과측험' },
  ]}
];

const QUICK_LINKS = [
  { name: '학교소개', icon: <BookOpen size={16} /> },
  { name: '학사일정', icon: <Calendar size={16} /> },
  { name: '급식식단', icon: <Music size={16} /> },
  { name: '교내갤러리', icon: <Camera size={16} /> },
  { name: '자유게시판', icon: <Users size={16} /> },
];

// --- Components ---

const SidebarMenu = ({ title, items }: { title: string, items: string[] }) => (
  <div className="border border-[#C0C0C0] bg-[#F0F0F0] mb-4 overflow-hidden shadow-sm beveled-border">
    <div className="bg-[#2B5797] text-white px-3 py-1 text-sm font-bold flex items-center gap-2">
      <ChevronRight size={14} /> {title}
    </div>
    <ul className="py-1">
      {items.map((item, i) => (
        <li key={i} className="px-4 py-1.5 text-xs hover:bg-[#D9E1F2] hover:text-[#2B5797] cursor-pointer border-b border-dotted border-[#C0C0C0] last:border-0">
          • {item}
        </li>
      ))}
    </ul>
  </div>
);

const SectionTitle = ({ title, more = true }: { title: string, more?: boolean }) => (
  <div className="flex justify-between items-end border-b-2 border-[#2B5797] pb-1 mb-3">
    <h3 className="text-[#2B5797] font-bold text-sm flex items-center gap-2">
      <span className="w-1 h-4 bg-[#2B5797]"></span>
      {title}
    </h3>
    {more && <span className="text-[10px] text-gray-400 cursor-pointer hover:underline">more +</span>}
  </div>
);

export default function App() {
  const [time, setTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(1208);
  const [showPopup, setShowPopup] = useState(true);
  const [currentView, setCurrentView] = useState('HOME');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleBGM = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopBGM = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const visitorTimer = setInterval(() => setVisitorCount(prev => prev + Math.floor(Math.random() * 2)), 5000);
    
    // Attempt to autoplay
    const attemptPlay = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            window.removeEventListener('click', attemptPlay);
          })
          .catch(e => {
            console.log("Autoplay blocked, waiting for user interaction:", e);
          });
      }
    };

    // Initial attempt
    setTimeout(attemptPlay, 1000);

    // Fallback: play on first click
    window.addEventListener('click', attemptPlay);

    return () => {
      clearInterval(timer);
      clearInterval(visitorTimer);
      window.removeEventListener('click', attemptPlay);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#333] selection:bg-[#2B5797] selection:text-white relative">
      {/* Simulated Popup */}
      {showPopup && (
        <div className="fixed top-20 left-20 z-[100] w-64 bg-white border-2 border-[#2B5797] shadow-xl beveled-border">
          <div className="bg-[#2B5797] text-white px-2 py-1 text-[10px] font-bold flex justify-between items-center">
            <span>[공지] 축제 안내</span>
            <button onClick={() => setShowPopup(false)} className="hover:text-red-300">X</button>
          </div>
          <div className="p-4">
            <img 
              src="https://picsum.photos/seed/festival/200/200" 
              alt="Festival" 
              className="w-full mb-2 border border-[#C0C0C0] inset-border"
              referrerPolicy="no-referrer"
            />
            <p className="text-[10px] font-bold text-center">제12회 자운제 개최! <br/> 많은 참여 바랍니다.</p>
          </div>
          <div className="bg-[#F0F0F0] p-1 text-[9px] text-right border-t border-[#C0C0C0]">
            <label className="flex items-center justify-end gap-1 cursor-pointer">
              <input type="checkbox" onChange={() => setShowPopup(false)} /> 오늘 하루 보지 않기
            </label>
          </div>
        </div>
      )}

      {/* Top Utility Bar */}
      <div className="bg-[#F0F0F0] border-b border-[#C0C0C0] py-1 px-8 text-[10px] font-bold text-gray-500 beveled-border">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1"><Clock size={10} /> {time.toLocaleTimeString()}</span>
            <span className="text-[#2B5797]">접속자: {visitorCount}명</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-[#2B5797] cursor-pointer">HOME</span>
            <span className="hover:text-[#2B5797] cursor-pointer">LOGIN</span>
            <span className="hover:text-[#2B5797] cursor-pointer">JOIN</span>
            <span className="hover:text-[#2B5797] cursor-pointer">SITEMAP</span>
          </div>
        </div>
      </div>

      {/* Marquee News - Only on HOME */}
      {currentView === 'HOME' && (
        <div className="bg-[#FFF9C4] border-b border-[#C0C0C0] py-1 overflow-hidden whitespace-nowrap beveled-border">
          <div className="inline-block animate-marquee text-[11px] font-bold text-[#856404]">
            [긴급] 2008학년도 하계 교복 착용 기간 안내 • [공지] 제12회 자운고 축제 '자운제' 찬조 출연 동아리 모집 • [안내] 방송부 점심 라디오 사연 당첨자 발표 (2학년 11반 뤄*타오 학생 외 3명) • [필독] 교내 휴대전화 사용 규정 강화 안내
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-[#C0C0C0] py-6 px-8 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentView('HOME')}>
            <div className="w-16 h-16 bg-[#2B5797] rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 border-[#D9E1F2] beveled-border overflow-hidden">
              <img 
                src="/assets/emblem.png" 
                alt="Jaun High School Emblem" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerText = 'JU';
                }}
              />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-[#2B5797]">자운고등학교</h1>
              <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">市立紫雲高級中學 2008</p>
            </div>
          </div>
          
          <div className="flex items-center bg-[#F0F0F0] border border-[#C0C0C0] px-3 py-1.5 rounded inset-border">
            <input 
              type="text" 
              placeholder="검색어를 입력하세요" 
              className="bg-transparent text-xs outline-none w-48"
            />
            <Search size={14} className="text-gray-400" />
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="bg-[#2B5797] border-y border-[#1A3A63] beveled-border">
        <div className="max-w-6xl mx-auto flex">
          {['학교소개', '학사행정', '학생마당', '동아리활동', '입학안내', '커뮤니티'].map((menu) => (
            <div 
              key={menu} 
              onClick={() => setCurrentView(menu)}
              className={`px-8 py-3 text-white text-sm font-bold hover:bg-[#1A3A63] cursor-pointer transition-colors border-r border-[#1A3A63] last:border-0 ${currentView === menu ? 'bg-[#1A3A63]' : ''}`}
            >
              {menu}
            </div>
          ))}
        </div>
      </nav>

      {/* Banner Area */}
      {currentView === 'HOME' && (
        <div className="max-w-6xl mx-auto mt-4 px-4">
          <div className="relative h-64 bg-[#D9E1F2] border border-[#C0C0C0] overflow-hidden group beveled-border">
            <img 
              src="https://picsum.photos/seed/school-campus/1200/400" 
              alt="Main Banner" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B5797]/60 to-transparent flex flex-col justify-center px-12 text-white">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-2"
              >
                <h2 className="text-4xl font-black italic drop-shadow-lg">"꿈을 향한 열정, 자운의 이름으로"</h2>
                <p className="text-sm font-bold bg-black/30 inline-block px-2 py-1">2008학년도 신입생 모집 요강 안내</p>
              </motion.div>
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-white' : 'bg-white/30'}`}></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <main className="max-w-6xl mx-auto mt-6 px-4 grid grid-cols-12 gap-6 pb-20">
        
        {/* Left Sidebar - Only on HOME */}
        {currentView === 'HOME' && (
          <aside className="col-span-12 lg:col-span-3">
            <div className="bg-[#2B5797] text-white p-4 mb-4 flex flex-col items-center text-center rounded-t beveled-border">
              <User size={48} className="mb-2 opacity-50" />
              <p className="text-xs mb-1">로그인이 필요합니다.</p>
              <button className="bg-white text-[#2B5797] text-[10px] font-bold px-4 py-1 rounded hover:bg-[#D9E1F2] transition-colors inset-border">LOGIN</button>
            </div>

            <div className="border border-[#C0C0C0] bg-white p-4 mb-4 beveled-border">
              <SectionTitle title="BGM Player" more={false} />
              <audio ref={audioRef} src="/assets/bgm.mp3" loop />
              <div className="bg-[#E0E0E0] p-2 border border-[#C0C0C0] inset-border">
                <div className="bg-black p-2 mb-2">
                  <p className="text-[9px] text-[#00FF00] font-mono overflow-hidden whitespace-nowrap">
                    <span className={`inline-block ${isPlaying ? 'animate-marquee-slow' : ''}`}>
                      Jay Chou - Secret (不能說의秘密) .mp3 &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  </p>
                </div>
                <div className="flex justify-between items-center px-1">
                  <div className="flex gap-1">
                    <div 
                      onClick={toggleBGM}
                      className="w-4 h-4 bg-[#C0C0C0] border border-white border-b-gray-600 border-r-gray-600 flex items-center justify-center cursor-pointer active:border-inset"
                    >
                      {isPlaying ? (
                        <div className="w-2 h-2 bg-black"></div>
                      ) : (
                        <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-black border-b-[3px] border-b-transparent ml-0.5"></div>
                      )}
                    </div>
                    <div 
                      onClick={stopBGM}
                      className="w-4 h-4 bg-[#C0C0C0] border border-white border-b-gray-600 border-r-gray-600 flex items-center justify-center cursor-pointer active:border-inset"
                    >
                      <div className="w-2 h-2 bg-black"></div>
                    </div>
                  </div>
                  <div className="flex gap-[1px]">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                      <div key={i} className={`w-1 h-3 ${isPlaying && i < 6 ? 'bg-[#00FF00]' : 'bg-gray-600'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[#C0C0C0] bg-[#F0F0F0] mb-4 beveled-border">
              <div className="bg-[#2B5797] text-white px-3 py-1 text-sm font-bold flex items-center gap-2">
                <BookOpen size={14} /> 학생 생활 수칙
              </div>
              <div className="p-3 space-y-3 text-[10px] leading-tight">
                <div>
                  <p className="font-bold text-[#2B5797] mb-1">■ 복장 규정</p>
                  <p className="text-gray-600">흰 셔츠(이름 자수 필수) + 교복 바지/치마. 체육복 등교 허용.</p>
                </div>
              </div>
            </div>

            <div className="border border-[#C0C0C0] bg-white p-4 mb-4 beveled-border">
              <SectionTitle title="교훈" more={false} />
              <div className="text-center py-2 space-y-2">
                <p className="text-sm font-black text-[#2B5797]">성실 (誠實)</p>
                <p className="text-sm font-black text-[#2B5797]">창의 (創意)</p>
                <p className="text-sm font-black text-[#2B5797]">봉사 (奉仕)</p>
              </div>
            </div>

            <SidebarMenu title="학교소개" items={['학교장 인사말', '학교연혁', '교훈/교가/교목', '오시는 길']} />
            <SidebarMenu title="학생활동" items={['학생회 공지', '방송부 (라디오)', '천문부 (별밤)', '체육대회 갤러리']} />
            
            <div className="border border-[#C0C0C0] bg-white p-4 mb-4 beveled-border">
              <SectionTitle title="Quick Links" more={false} />
              <div className="grid grid-cols-2 gap-2">
                {QUICK_LINKS.map(link => (
                  <div key={link.name} onClick={() => setCurrentView(link.name === '학사일정' ? '학사행정' : link.name)} className="flex items-center gap-2 text-[10px] font-bold p-2 bg-[#F5F5F5] hover:bg-[#D9E1F2] cursor-pointer border border-[#E0E0E0] inset-border">
                    <span className="text-[#2B5797]">{link.icon}</span>
                    {link.name}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Center Content */}
        <section className={`col-span-12 ${currentView === 'HOME' ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-6`}>
          {currentView === 'HOME' && (
            <>
              <div className="bg-white border border-[#C0C0C0] p-8 text-center beveled-border">
                <h2 className="text-2xl font-black text-[#2B5797] mb-2">시립자운고등학교에 오신 것을 환영합니다</h2>
                <p className="text-xs text-gray-500">2008학년도 공식 홈페이지</p>
              </div>

              {/* Banner Small */}
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-[#2B5797] text-white flex items-center justify-center font-bold text-sm p-4 text-center cursor-pointer hover:opacity-90 beveled-border">
                  [안내] 2008학년도 <br/> 교복 공동구매 신청
                </div>
                <div className="h-20 bg-accent text-white flex items-center justify-center font-bold text-sm p-4 text-center cursor-pointer hover:opacity-90 beveled-border">
                  [모집] 제1기 <br/> 자운고 홍보대사
                </div>
              </div>
            </>
          )}

          {currentView === '학교소개' && (
            <div className="space-y-6">
              {/* Notice Board */}
              <div className="bg-white border border-[#C0C0C0] p-4 shadow-sm beveled-border">
                <SectionTitle title="공지사항" />
                <div className="space-y-2">
                  {NOTICES.map(notice => (
                    <div key={notice.id} className="flex justify-between items-center text-xs border-b border-dotted border-[#C0C0C0] pb-1.5 last:border-0 group cursor-pointer">
                      <div className="flex gap-2 items-center overflow-hidden">
                        <Megaphone size={12} className="text-accent shrink-0" />
                        <span className="truncate group-hover:underline">{notice.title}</span>
                      </div>
                      <span className="text-gray-400 shrink-0 ml-4">{notice.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#C0C0C0] p-4 shadow-sm beveled-border">
                <SectionTitle title="2008 단수이" more={false} />
                <div className="text-xs leading-relaxed space-y-3">
                  <p>
                    배경: 2008년 대만 신베이시 단수이의 시립 자운 고등학교. 슬라이드 폰과 MSN 메신저가 유행하던 시절의 이야기
                  </p>
                  <div className="bg-[#F5F5F5] p-3 border border-dotted border-[#C0C0C0] inset-border space-y-2">
                    <div>
                      <p className="font-bold text-[#2B5797] text-[10px]">교복 및 시대상</p>
                      <p className="text-[9px]">가슴에 빨강(여)/파랑(남) 자수로 학번과 이름이 박힌 흰 셔츠. 스마트폰 대신 슬라이드폰과 공중전화가 발달한 시대.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Starting Scenarios */}
              <div className="bg-white border border-[#C0C0C0] p-4 shadow-sm beveled-border">
                <SectionTitle title="시작 설정" more={false} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-[#FFF9C4] border border-[#C0C0C0] inset-border">
                    <p className="text-[10px] font-black text-[#856404] mb-1">1장: 장위안에게</p>
                    <p className="text-[9px] leading-tight text-gray-700">장위안에게 전해져야할 러브레터가 뤄천타오에게 잘못 전달됐다!</p>
                  </div>
                  <div className="p-3 bg-[#D9E1F2] border border-[#C0C0C0] inset-border">
                    <p className="text-[10px] font-black text-[#2B5797] mb-1">2장: 뤄천타오에게</p>
                    <p className="text-[9px] leading-tight text-gray-700">뤄천타오에게 전해져야할 러브레터가 장위안에게 잘못 전달됐다!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === '학사행정' && (
            <div className="space-y-6">
              {/* Academic Calendar */}
              <div className="bg-white border border-[#C0C0C0] p-4 shadow-sm beveled-border">
                <SectionTitle title="2008학년도 학사일정" more={false} />
                <div className="grid grid-cols-2 gap-4">
                  {ACADEMIC_CALENDAR.map(term => (
                    <div key={term.term} className="space-y-2">
                      <p className="text-[11px] font-black text-[#2B5797] border-b border-[#2B5797]">{term.term}</p>
                      {term.events.map((ev, idx) => (
                        <div key={idx} className="text-[11px] flex gap-1">
                          <span className="font-bold shrink-0 w-8">{ev.m}</span>
                          <span className="text-gray-600">{ev.e}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Class Characteristics */}
              <div className="bg-white border border-[#C0C0C0] p-4 shadow-sm beveled-border">
                <SectionTitle title="자운고 학급 특성" more={false} />
                <div className="bg-[#F5F5F5] p-3 border border-dotted border-[#C0C0C0] inset-border">
                  <ul className="space-y-2 text-[10px]">
                    <li>• <span className="font-bold text-[#2B5797]">1반 (최상위):</span> 고요한 자습실 분위기. 선생님들의 집중 관리.</li>
                    <li>• <span className="font-bold text-[#2B5797]">2-7반 (상/중위):</span> 평범한 학교 분위기. 적당한 학습과 놀이.</li>
                    <li>• <span className="font-bold text-[#2B5797]">8-10반 (하위):</span> 왁자지껄하고 시끄러움. 벽면 낙서 가득.</li>
                    <li>• <span className="font-bold text-[#2B5797]">11반 (최하위):</span> 문제아반 인식. 선생님들도 포기한 방치된 교실.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {currentView === '학생마당' && (
            <div className="space-y-6">
              <div className="bg-white border border-[#C0C0C0] p-6 shadow-sm beveled-border">
                <SectionTitle title="캐릭터 상세 프로필" more={false} />
                <div className="space-y-12">
                  {CHARACTERS.map(char => (
                    <div key={char.id} className="relative">
                      {/* Character Header Card */}
                      <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Image Container */}
                        <div className="w-full md:w-56 aspect-[3/4] shrink-0 border-4 border-[#2B5797] shadow-md overflow-hidden bg-gray-100 relative group">
                          <img 
                            src={char.image} 
                            alt={char.name} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-[#2B5797]/80 text-white text-[9px] py-1 text-center font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            STUDENT ID: {char.id.toUpperCase()}-2008
                          </div>
                        </div>

                        {/* Info Grid */}
                        <div className="flex-1 space-y-5 w-full">
                          <div className="border-b-4 border-[#2B5797] pb-3">
                            <h4 className="text-2xl font-black text-[#2B5797] tracking-tighter leading-none">{char.name}</h4>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">{char.class} / {char.club}</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-[11px]">
                            <div className="flex items-center border-b border-gray-100 pb-1">
                              <span className="w-20 font-black text-gray-400 uppercase text-[9px]">Birth</span>
                              <span className="font-bold text-gray-800">{char.birth}</span>
                            </div>
                            <div className="flex items-center border-b border-gray-100 pb-1">
                              <span className="w-20 font-black text-gray-400 uppercase text-[9px]">Height</span>
                              <span className="font-bold text-gray-800">{char.height}</span>
                            </div>
                            <div className="flex items-center border-b border-gray-100 pb-1">
                              <span className="w-20 font-black text-gray-400 uppercase text-[9px]">MBTI</span>
                              <span className="font-bold text-gray-800">{char.mbti}</span>
                            </div>
                            <div className="flex items-center border-b border-gray-100 pb-1">
                              <span className="w-20 font-black text-gray-400 uppercase text-[9px]">Nicknames</span>
                              <span className="font-bold text-[#2B5797]">{char.nicknames}</span>
                            </div>
                          </div>

                          <div className="bg-[#F8F9FA] p-5 border-l-4 border-[#2B5797] inset-border relative">
                            <Quote className="absolute -top-2 -left-2 text-[#2B5797]/10" size={32} />
                            <div className="space-y-2 relative z-10">
                              <p className="text-[11px] leading-relaxed text-gray-700 font-medium">
                                {char.desc}
                              </p>
                              {char.scars && char.scars !== '-' && (
                                <p className="text-[10px] text-red-600 font-bold">
                                  <span className="opacity-50 mr-2">SCARS:</span> {char.scars}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Detailed Sections */}
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 border border-gray-200 rounded shadow-sm">
                            <h5 className="text-[11px] font-black text-[#2B5797] mb-2 uppercase tracking-tighter flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#2B5797] rotate-45"></div>
                              성격
                            </h5>
                            <p className="text-[10px] leading-relaxed text-gray-600">{char.personality}</p>
                          </div>
                          <div className="bg-gray-50 p-4 border border-gray-200 rounded shadow-sm">
                            <h5 className="text-[11px] font-black text-[#2B5797] mb-2 uppercase tracking-tighter flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#2B5797] rotate-45"></div>
                              특징
                            </h5>
                            <p className="text-[10px] leading-relaxed text-gray-600">{char.features}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 border border-gray-200 rounded shadow-sm">
                            <h5 className="text-[11px] font-black text-[#2B5797] mb-2 uppercase tracking-tighter flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#2B5797] rotate-45"></div>
                              집안 배경
                            </h5>
                            <p className="text-[10px] leading-relaxed text-gray-600">{char.family}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Divider */}
                      {char.id === 'tao' && (
                        <div className="mt-12 mb-12 flex items-center gap-4">
                          <div className="flex-1 h-px bg-gray-200"></div>
                          <div className="text-[9px] font-bold text-gray-300 tracking-[0.5em] uppercase">Next Profile</div>
                          <div className="flex-1 h-px bg-gray-200"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === '커뮤니티' && (
            <div className="space-y-6">
              <div className="bg-[#D9E1F2] border border-[#2B5797] p-6 shadow-sm beveled-border">
                <SectionTitle title="교내 특별 놀이: 샤오미미(小秘密) 가이드" more={false} />
                
                <div className="mt-6 space-y-8">
                  {/* Step 1 & 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div className="bg-white p-4 border border-[#C0C0C0] inset-border text-center space-y-2">
                      <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                        <Heart size={20} />
                      </div>
                      <p className="text-[11px] font-black">1. 러브레터 작성</p>
                      <p className="text-[9px] text-gray-500">좋아하는 사람에게 <br/>진심을 담아 익명으로!</p>
                    </div>

                    <div className="flex justify-center">
                      <ArrowRight className="text-[#2B5797] hidden md:block" />
                      <div className="h-6 w-px bg-[#2B5797] md:hidden"></div>
                    </div>

                    <div className="bg-white p-4 border border-[#C0C0C0] inset-border text-center space-y-2">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                        <Inbox size={20} />
                      </div>
                      <p className="text-[11px] font-black">2. 사물함 배달</p>
                      <p className="text-[9px] text-gray-500">상대방의 사물함에 <br/>몰래 넣어두기</p>
                    </div>
                  </div>

                  {/* The Rule Section */}
                  <div className="bg-white/40 border-2 border-dashed border-[#2B5797] p-4 rounded-lg relative">
                    <div className="absolute -top-3 left-4 bg-[#2B5797] text-white text-[9px] px-2 py-0.5 font-bold">CRITICAL RULE</div>
                    <div className="flex items-start gap-4">
                      <div className="bg-yellow-400 p-2 rounded-full shrink-0">
                        <AlertCircle size={24} className="text-white" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[11px] font-black text-red-600">촉구장(促求狀)을 받았다면?</p>
                        <p className="text-[10px] leading-tight text-gray-700">
                          좋아하는 사람이 아닌 다른 이에게 받은 '촉구장'은 일종의 행운의 편지! <br/>
                          <span className="font-bold underline">5일 이내</span>에 당신도 누군가에게 <span className="font-bold text-red-600">러브레터</span>를 보내야만 소동에서 살아남을 수 있습니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Flow Summary */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#FFF9C4] p-3 border border-[#C0C0C0] inset-border flex items-center gap-3">
                      <FileText size={16} className="text-[#856404]" />
                      <div>
                        <p className="text-[10px] font-black text-[#856404]">촉구장</p>
                        <p className="text-[8px]">전달받은 사람에게 고백을 강요함</p>
                      </div>
                    </div>
                    <div className="bg-[#D9E1F2] p-3 border border-[#C0C0C0] inset-border flex items-center gap-3">
                      <Mail size={16} className="text-[#2B5797]" />
                      <div>
                        <p className="text-[10px] font-black text-[#2B5797]">러브레터</p>
                        <p className="text-[8px]">순수한 마음을 전달하는 고백</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] text-gray-600 italic bg-white/30 py-2 px-4 rounded-full inline-block">
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(currentView === '동아리활동' || currentView === '입학안내') && (
            <div className="bg-white border border-[#C0C0C0] p-8 text-center beveled-border">
              <SectionTitle title={currentView} more={false} />
              <p className="text-sm text-gray-400 italic">준비 중인 페이지입니다.</p>
            </div>
          )}
        </section>

        {/* Right Sidebar - Only on HOME */}
        {currentView === 'HOME' && (
          <aside className="col-span-12 lg:col-span-3 space-y-4">
            {/* Best Student */}
            <div className="border border-[#C0C0C0] bg-white p-4 beveled-border">
              <SectionTitle title="이달의 자운인" />
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 border border-[#C0C0C0] p-1 mb-2 inset-border">
                  <img 
                    src="/assets/best_student.png" 
                    alt="Best Student" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-xs font-bold text-[#2B5797]">장위안 (2-1)</p>
                <p className="text-[10px] text-gray-500 mt-1">"성실함은 자운의 자부심입니다."</p>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="border border-[#C0C0C0] bg-white p-4 beveled-border">
              <SectionTitle title="오늘의 일정" />
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="bg-[#D9E1F2] text-[#2B5797] px-2 py-1 text-[10px] font-bold rounded inset-border">12:30</div>
                  <p className="text-[10px] font-bold leading-tight">점심시간 라디오 방송 <br/> <span className="text-gray-400">(DJ 장위안)</span></p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="bg-[#D9E1F2] text-[#2B5797] px-2 py-1 text-[10px] font-bold rounded inset-border">16:30</div>
                  <p className="text-[10px] font-bold leading-tight">천문부 정기 관측회 <br/> <span className="text-gray-400">(옥상 천문대)</span></p>
                </div>
              </div>
            </div>

            {/* School Song */}
            <div className="border border-[#C0C0C0] bg-[#F9F9F9] p-4 beveled-border">
              <SectionTitle title="자운고 교가" more={false} />
              <div className="text-center py-2">
                <Music size={24} className="mx-auto mb-2 text-gray-300" />
                <p className="text-[10px] text-gray-500 leading-relaxed italic">
                  "단수이 푸른 물결 가슴에 품고 <br/>
                  자운의 높은 기상 하늘에 닿네..."
                </p>
              </div>
            </div>

            {/* Banner Vertical */}
            <div className="border border-[#C0C0C0] overflow-hidden beveled-border">
              <img 
                src="https://picsum.photos/seed/tamsui/300/600" 
                alt="Tamsui View" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </aside>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#F0F0F0] border-t border-[#C0C0C0] py-10 px-8 text-center">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex justify-center gap-6 text-[10px] font-bold text-gray-500">
            <span>개인정보처리방침</span>
            <span>이메일무단수집거부</span>
            <span>찾아오시는길</span>
            <span>학교소개</span>
          </div>
          <div className="text-[10px] text-gray-400 leading-relaxed">
            [25147] 대만 신베이시 단수이구 자운길 2008 (시립자운고등학교) <br/>
            TEL: 02-2008-0915 | FAX: 02-2008-0916 <br/>
            COPYRIGHT (C) 2008 MUNICIPAL JAUN HIGH SCHOOL. ALL RIGHTS RESERVED.
          </div>
          <div className="flex justify-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white"><ExternalLink size={14} /></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white"><Heart size={14} /></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

