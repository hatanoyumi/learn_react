import { route } from './index';

export const META_TITLE: Record<string, string> = {
  [route.home]: 'NHN Group ｜ 採用サイト',
  [route.corps.japan]: 'NHN Japan ｜ 採用サイト',
  [route.corps.playart]: 'NHN PlayArt ｜ 採用サイト',
  [route.corps.techorus]: 'NHN Techorus ｜ 採用サイト',
  [route.corps.comico]: 'NHN comico ｜ 採用サイト',
  [route.corps.studioComico]: 'NHN Studio comico ｜ 採用サイト',
  [route.corps.fukuoka]: 'NHN Fukuoka ｜ 採用サイト',
  [route.corps.cloud]: 'NHN Cloud Japan ｜ 採用サイト',

  [route.recruit.list.main]: 'NHNグループ採用',
  [route.recruit.list.japan]: 'NHN採用',
  [route.recruit.list.playart]: 'PlayArt採用',
  [route.recruit.list.techorus]: 'Techorus採用',
  [route.recruit.list.comico]: 'comico採用',
  [route.recruit.list.studioComico]: 'Studio comico採用',
  [route.recruit.list.fukuoka]: 'NHN FUKUOKA採用',
  [route.recruit.list.cloud]: 'NHN Cloud採用',

  [route.recruit.detail.main()]: 'NHNグループ採用',
  [route.recruit.detail.japan()]: 'NHN採用',
  [route.recruit.detail.playart()]: 'PlayArt採用',
  [route.recruit.detail.techorus()]: 'Techorus採用',
  [route.recruit.detail.comico()]: 'comico採用',
  [route.recruit.detail.studioComico()]: 'Studio comico採用',
  [route.recruit.detail.fukuoka()]: 'NHN FUKUOKA採用',
  [route.recruit.detail.cloud()]: 'NHN Cloud採用',

  [route.faq]: 'NHN よくある質問',
  [route.notice]: 'NHN お知らせ',
  [route.guide]: 'NHN 採用までのプロセス',
  [route.info]: 'NHN 働くシステム',
};

export const META_DESCRIPTION: Record<string, string> = {
  [route.home]: '様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.corps.japan]:
    'NHN Japan では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.corps.playart]:
    'NHN PlayArt では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.corps.techorus]:
    'NHN Techorus では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.corps.comico]:
    'NHN comico では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.corps.studioComico]:
    'NHN Studio comico では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.corps.fukuoka]:
    'NHN Fukuoka では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.corps.cloud]:
    'NHN Cloud Japan では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',

  [route.recruit.list.main]: '様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.recruit.list.japan]:
    'NHN Japan では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.recruit.list.playart]:
    'NHN PlayArt では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.recruit.list.techorus]:
    'NHN Techorus では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.recruit.list.comico]:
    'NHN comico では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.recruit.list.studioComico]:
    'NHN Studio comico では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.recruit.list.fukuoka]:
    'NHN Fukuoka では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.recruit.list.cloud]:
    'NHN Cloud Japan では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',

  [route.recruit.detail.main()]: '様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.recruit.detail.japan()]:
    'NHN Japan では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.recruit.detail.playart()]:
    'NHN PlayArt では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.recruit.detail.techorus()]:
    'NHN Techorus では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.recruit.detail.comico()]:
    'NHN comico では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.recruit.detail.studioComico()]:
    'NHN Studio comico では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.recruit.detail.fukuoka()]:
    'NHN Fukuoka では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',
  [route.recruit.detail.cloud()]:
    'NHN Cloud Japan では様々な人材を募集しています。採用ページには募集中の求人一覧、ワークスペース紹介、社員データ、社員インタビュー、福利厚生などを掲載しています。',

  [route.faq]: 'NHN よくある質問',
  [route.notice]: 'NHN お知らせ',
  [route.guide]: 'NHN 採用までのプロセス',
  [route.info]: 'NHN 働くシステム',
};

export const META_KEYWORD: Record<string, string> = {
  [route.home]: 'NHN, NHN Group, NHNグループ, NHNリクルート, NHN採用, NHNグループ採用',
  [route.corps.japan]: 'NHN JAPAN, NHNジャパン, NHN採用',
  [route.corps.playart]: 'NHN PlayArt, プレイアート, PlayArt採用, ゲーム, game',
  [route.corps.techorus]:
    'NHN Techorus, テコラス, Techorus採用, パブリッククラウド, ITインフラ・ソリューション,  クラウド, cloud',
  [route.corps.comico]: 'NHN comico, コミコ, comico採用, webtoon, manga, 漫画',
  [route.corps.studioComico]: 'NHN Studio comico, スタジオコミコ, Studio comico採用, webtoon, manga, 漫画',
  [route.corps.fukuoka]: 'NHN FUKUOKA, NHN福岡, NHN FUKUOKA採用',
  [route.corps.cloud]: 'NHN Cloud Japan, NHNクラウド, NHN Cloud採用, クラウド, cloud',

  [route.recruit.list.main]: 'NHN Group, NHNグループ, NHNグループ採用',
  [route.recruit.list.japan]: 'NHN JAPAN, NHNジャパン, NHN採用',
  [route.recruit.list.playart]: 'NHN PlayArt, プレイアート, PlayArt採用, ゲーム, game',
  [route.recruit.list.techorus]:
    'NHN Techorus, テコラス, Techorus採用, パブリッククラウド, ITインフラ・ソリューション,  クラウド, cloud',
  [route.recruit.list.comico]: 'NHN comico, コミコ, comico採用, webtoon, manga, 漫画',
  [route.recruit.list.studioComico]: 'NHN Studio comico, スタジオコミコ, Studio comico採用, webtoon, manga, 漫画',
  [route.recruit.list.fukuoka]: 'NHN FUKUOKA, NHN福岡, NHN FUKUOKA採用',
  [route.recruit.list.cloud]: 'NHN Cloud Japan, NHNクラウド, NHN Cloud採用, クラウド, cloud',

  [route.recruit.detail.main()]: 'NHN Group, NHNグループ, NHNグループ採用',
  [route.recruit.detail.japan()]: 'NHN JAPAN, NHNジャパン, NHN採用',
  [route.recruit.detail.playart()]: 'NHN PlayArt, プレイアート, PlayArt採用, ゲーム, game',
  [route.recruit.detail.techorus()]:
    'NHN Techorus, テコラス, Techorus採用, パブリッククラウド, ITインフラ・ソリューション,  クラウド, cloud',
  [route.recruit.detail.comico()]: 'NHN comico, コミコ, comico採用, webtoon, manga, 漫画',
  [route.recruit.detail.studioComico()]: 'NHN Studio comico, スタジオコミコ, Studio comico採用, webtoon, manga, 漫画',
  [route.recruit.detail.fukuoka()]: 'NHN FUKUOKA, NHN福岡, NHN FUKUOKA採用',
  [route.recruit.detail.cloud()]: 'NHN Cloud Japan, NHNクラウド, NHN Cloud採用, クラウド, cloud',

  [route.faq]: 'NHN よくある質問',
  [route.notice]: 'NHN お知らせ',
  [route.guide]: 'NHN 採用までのプロセス',
  [route.info]: 'NHN 働くシステム',
};

export const META_COMMON_KEYWORD =
  '求人, 人材, 募集, 福利厚生, 採用プロセス, 社員データ, 社員インタビュー, 新卒, 中途, キャリア, グローバル, リクルート, 採用, recruit';
