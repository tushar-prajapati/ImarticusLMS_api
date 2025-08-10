import mongoose from 'mongoose'

const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String }, 
  content: { type: String }, 
});
const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoUrl: { type: String }, 
    content: { type: String }, 
  });

const fileSchema = new mongoose.Schema({
    type: String,
    name: String,
    url: String,
})

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true },
  lectures: [lectureSchema],
  quiz: [quizSchema],
  files: [fileSchema],
  completed: Boolean,

});



const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  batch: { type: String, required: true },
  sections: [sectionSchema],
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;