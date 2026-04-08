import { useState, useEffect } from 'react';

export const useUtamyData = () => {
  // --- 1. ユーザー情報 (自分) ---
  const [user, setUser] = useState({
    name: 'ナオ', // フルネームからニックネームに変更
    email: 'nao.murata@example.com',
    instrument: 'ボーカル',
    genre: 'J-POP, アニソン'
  });

  // --- 2. 募集一覧のサンプルデータ ---
  const [recruitments, setRecruitments] = useState([
    {
      id: 'rec-001',
      title: '【参加中テスト】週末アニソン縛りカラオケ！',
      location: '梅田',
      date: '2026-04-12',
      capacity: 4,
      musicGenre: 'アニソン',
      author: 'ケンケン',
      content: 'アニソンが大好きな人募集です！最新曲から懐メロまで何でもOK。現在は私とナオさんの2名が確定しています。残り2名募集です！'
    },
    {
      id: 'rec-002',
      title: '会社帰りにサクッとJ-POP',
      location: '難波',
      date: '2026-04-15',
      capacity: 3,
      musicGenre: 'J-POP',
      author: 'ミカリン',
      content: '仕事終わりに1〜2時間だけ歌いに行きませんか？最新のチャート曲を中心に歌いたいと思っています。'
    }
  ]);

  // --- 3. やり取り（ログ）のサンプルデータ ---
  const [comments, setComments] = useState([
    // rec-001（アニソン）に対するやり取り
    {
      id: 1712550000000,
      recruitmentId: 'rec-001',
      userName: 'ナオ', // 自分が既に参加している状態
      content: '参加希望です！デジモン歌いたいです！',
      confirmed: true
    },
    {
      id: 1712551000000,
      recruitmentId: 'rec-001',
      userName: 'ケンケン',
      content: 'ナオさん、ありがとうございます！ぜひデジモン歌いましょう！',
      confirmed: true
    },
    // rec-002（J-POP）に対するやり取り（未参加の状態）
    {
      id: 1712560000000,
      recruitmentId: 'rec-002',
      userName: 'ミカリン',
      content: '誰か一緒に歌いに行きませんか？',
      confirmed: true
    }
  ]);

  // --- 4. 共通のアクション関数 ---

  const applyToRecruitment = (recruitment, message) => {
    const newComment = {
      id: Date.now(),
      recruitmentId: recruitment.id,
      userName: user.name,
      content: message,
      confirmed: true
    };
    setComments([...comments, newComment]);
  };

  const addRecruitment = (newRec) => {
    const id = `rec-${Date.now()}`;
    setRecruitments([...recruitments, { ...newRec, id, author: user.name }]);
  };

  const deleteRecruitment = (id) => {
    setRecruitments(recruitments.filter(r => r.id !== id));
    setComments(comments.filter(c => c.recruitmentId !== id));
  };

  const deleteUser = () => {
    setUser(null);
  };

  const isAdmin = user?.name === '管理者';

  return {
    user,
    setUser,
    recruitments,
    comments,
    setComments,
    applyToRecruitment,
    addRecruitment,
    deleteRecruitment,
    deleteUser,
    isAdmin
  };
};