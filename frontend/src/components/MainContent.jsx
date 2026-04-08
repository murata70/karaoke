import React from 'react';
import Home from './Home';
import RecruitmentList from './RecruitmentList';
import PostForm from './PostForm';
import MessageLogs from './MessageLogs';
import UserProfile from './UserProfile';
import MyPage from './MyPage';

function MainContent(props) {
  // propsからすべてのデータと関数を受け取る
  const { activeTab, setSelectedRecruitmentId, setActiveTab, ...others } = props;

  // 募集詳細（募集リスト画面の詳細モード）へ飛ぶ際の共通ハンドラ
  const handleViewDetail = (recruitmentId) => {
    setSelectedRecruitmentId(recruitmentId);
    setActiveTab('list');
  };

  // タブ名に応じた出し分け（switch文で整理）
  switch (activeTab) {
    case 'home':
      return (
        <Home 
          {...others} 
          setActiveTab={setActiveTab} 
          onViewDetail={handleViewDetail} // 【追加】ホームでも詳細移動を可能に
        />
      );

    case 'list':
      return (
        <RecruitmentList 
          {...others} 
          setActiveTab={setActiveTab}
          initialSelectedId={others.selectedRecruitmentId} 
        />
      );

    case 'post':
      return <PostForm {...others} setActiveTab={setActiveTab} />;

    case 'logs':
      return <MessageLogs {...others} onViewDetail={handleViewDetail} />;

    case 'mypage':
      return <MyPage {...others} />;

    // サイドバーがどの名前で送ってきてもUserProfileを出す
    case 'registration':
    case 'settings':
    case 'profile':
      return <UserProfile {...others} setActiveTab={setActiveTab} />;

    default:
      return (
        <Home 
          {...others} 
          setActiveTab={setActiveTab} 
          onViewDetail={handleViewDetail} // 【追加】デフォルト時も対応
        />
      );
  }
}

export default MainContent;