import dbConnect from '../_utils/db.js';
import Content from '../_models/Content.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Clear existing content (optional, but good for clean seeding)
    // await Content.deleteMany({});

    const sampleContent = [
      // SEO MASTERY PLAN (course-1)
      {
        courseId: 'course-1',
        title: 'SEO Fundamentals: Keywords & Intent',
        description: 'Learn how to identify high-value keywords and map them to user search intent.',
        type: 'recorded',
        url: 'https://www.youtube.com/embed/DvwS7cV9GmQ', // Sample placeholder
        order: 1
      },
      {
        courseId: 'course-1',
        title: 'Technical SEO Audit Live Session',
        description: 'Join us for a live audit of a real-world e-commerce site.',
        type: 'live',
        url: 'https://zoom.us/j/sample-meeting-seo',
        scheduledAt: new Date(Date.now() + 86400000), // Tomorrow
        order: 1
      },
      {
        courseId: 'course-1',
        title: 'Advanced Backlink Strategy',
        description: 'Upcoming deep-dive into high-authority link building.',
        type: 'upcoming',
        scheduledAt: new Date(Date.now() + 86400000 * 3), // 3 days later
        order: 1
      },

      // SOCIAL MEDIA ACCELERATOR (course-2)
      {
        courseId: 'course-2',
        title: 'Viral Hooks for Instagram Reels',
        description: 'Recorded session on creating scroll-stopping hooks.',
        type: 'recorded',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        order: 1
      },
      {
        courseId: 'course-2',
        title: 'Weekly Meta Ad Strategy Q&A',
        description: 'Live coaching session for course members.',
        type: 'live',
        url: 'https://zoom.us/j/sample-meeting-smm',
        scheduledAt: new Date(Date.now() + 3600000), // 1 hour later
        order: 1
      }
    ];

    // Bulk upsert to avoid duplicates if re-run
    for (const item of sampleContent) {
      await Content.findOneAndUpdate(
        { title: item.title, courseId: item.courseId },
        item,
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ 
      success: true, 
      message: 'LMS Seed Data populated successfully!',
      plans: ['course-1', 'course-2']
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ success: false, message: 'Seeding failed' });
  }
}
