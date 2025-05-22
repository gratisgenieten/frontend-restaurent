// mockData.ts
import { User, ChatThread } from '@/components/Chat/types';
// import avatar from '@/images/avatars';
// Current user data
export const currentUser: User = {
  id: 'user1',
  name: 'Henry Jabbawockiez',
  avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
  status: 'online'
};

// Sample chat threads data that matches the image
export const chatThreads: ChatThread[] = [
  
  {
    id: 'chat1',
    user: {
      id: 'user2',
      name: 'Nika Jerrardo',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      lastOnline: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      status: 'online'
    },
    messages: [
      {
        id: 'm1',
        senderId: 'user2',
        content: 'Hello! Finally found the time to write to you) I need your help in creating interactive animations for my mobile application.',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        type: 'text',
      },
      {
        id: 'm2',
        senderId: 'user1',
        content: 'Can I send you files?',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 1000 * 60 * 30), // 4 days ago + 30 minutes
        type: 'text',
      },
      {
        id: 'm3',
        senderId: 'user2',
        content: 'Hey! Okay, send out.',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 1000 * 60 * 45), // 4 days ago + 45 minutes
        type: 'text',
      },
      {
        id: 'm4',
        senderId: 'user1',
        content: 'Style.zip',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 1000 * 60 * 60), // 4 days ago + 1 hour
        type: 'file',
        fileInfo: {
          name: 'Style.zip',
          size: '41.36 Mb',
          extension: 'zip',
        },
      },
      {
        id: 'm5',
        senderId: 'user2',
        content: 'Hello! I tweaked everything you asked. I am sending the finished file.',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        type: 'text',
      },
      {
        id: 'm6',
        senderId: 'user2',
        content: 'NEW-Style.zip',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 1000 * 60 * 5), // 3 days ago + 5 minutes
        type: 'file',
        fileInfo: {
          name: 'NEW-Style.zip',
          size: '52.05 Mb',
          extension: 'zip',
        },
      },
    ],
  },
  {
    id: 'chat2',
    user: {
      id: 'user3',
      name: 'Luy Robin',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      status: 'online'
    },
    messages: [
      {
        id: 'lm1',
        senderId: 'user3',
        content: 'Most of its text is made up from sections 1.10.32-3 of Cicero\'s De finibus bonorum et malorum (On the boundaries of Goods and Evils; finibus may also be translated as purposes).',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 minute ago
        type: 'text',
        isNew: true
      }
    ],
    unreadCount: 1
  },
  {
    id: 'chat3',
    user: {
      id: 'user4',
      name: 'Jared Sunn',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      status: 'online'
    },
    messages: [
      {
        id: 'jm1',
        senderId: 'user4',
        content: 'Voice message (01:15)',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 minute ago
        type: 'voice',
        isNew: true
      }
    ],
    unreadCount: 1
  },
  {
    id: 'chat4',
    user: {
      id: 'user5',
      name: 'David Amrosa',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
      status: 'do-not-disturb'
    },
    messages: [
      {
        id: 'dm1',
        senderId: 'user5',
        content: 'Please see my new video presentation of our product. Do you think the clients will like?',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        type: 'text',
      }
    ]
  },
  {
    id: 'chat5',
    user: {
      id: 'user6',
      name: 'Richard Marx',
      avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
      lastOnline: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
      status: 'offline'
    },
    messages: [
      {
        id: 'rm1',
        senderId: 'user1',
        content: 'Have you received the documents I sent last week?',
        timestamp: new Date('2023-07-05'), // Fixed date from image
        type: 'text',
      }
    ]
  },
  
];