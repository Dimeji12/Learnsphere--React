import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Users, PlayCircle, Filter, Search, List, Grid } from 'lucide-react';
import { useCourseContext } from '@/contexts/CourseContext';

const CourseCard = ({ course, index, viewMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`course-card h-full flex group ${viewMode === 'list' ? 'flex-row items-stretch' : 'flex-col'}`}
    >
      <Link to={`/courses/${course.id}`} className={`relative ${viewMode === 'list' ? 'w-1/3 md:w-1/4 aspect-video flex-shrink-0' : 'w-full aspect-video'} overflow-hidden ${viewMode === 'list' ? 'rounded-l-lg' : 'rounded-t-lg'}`}>
        <img  
          alt={course.title} 
          className="course-card-image"
          src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9ubGluZSUyMGxlYXJuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" 
        />
        {course.isNew && <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs px-1.5 py-0.5">NEW</Badge>}
      </Link>
      <div className={`flex flex-col flex-grow ${viewMode === 'list' ? 'w-2/3 md:w-3/4' : ''}`}>
        <CardHeader className={`p-4 ${viewMode === 'list' ? 'pb-2' : ''}`}>
          {course.category && <Badge variant="secondary" className="mb-1 text-xs">{course.category}</Badge>}
          <Link to={`/courses/${course.id}`}>
            <CardTitle className="text-base md:text-lg mb-1 leading-tight group-hover:text-primary transition-colors">{course.title}</CardTitle>
          </Link>
        </CardHeader>
        <CardContent className={`flex-grow p-4 ${viewMode === 'list' ? 'pt-0 pb-2' : 'pt-0'}`}>
          <p className={`text-xs text-muted-foreground mb-2 ${viewMode === 'list' ? 'line-clamp-2' : 'line-clamp-3'}`}>{course.shortDescription}</p>
          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 mr-1" /> {course.enrollmentCount}
            <span className="mx-1">·</span>
            <PlayCircle className="h-3.5 w-3.5 mr-1" /> {course.lessons.length} lessons
            {course.duration && <><span className="mx-1">·</span> {course.duration}</>}
          </div>
        </CardContent>
        <CardFooter className={`p-4 ${viewMode === 'list' ? 'pt-0' : ''} border-t mt-auto`}>
          <Button asChild variant="link" size="sm" className="text-primary p-0 h-auto text-xs">
            <Link to={`/courses/${course.id}`}>
              View Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardFooter>
      </div>
    </motion.div>
  );
};

const CoursesPage = () => {
  const { courses, categories, loading } = useCourseContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const filteredCourses = courses
    .filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(course => 
      selectedCategory === 'all' || course.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortBy === 'popularity') return b.enrollmentCount - a.enrollmentCount;
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div>
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Explore Our Courses</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">Find the perfect course to enhance your skills and achieve your goals.</p>
      </header>

      {/* Filters and Search Bar */}
      <div className="mb-8 p-4 md:p-6 bg-muted/50 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center justify-end gap-2">
            <Button variant={viewMode === 'grid' ? 'primary' : 'outline'} size="icon" onClick={() => setViewMode('grid')} aria-label="Grid view">
              <Grid className="h-5 w-5" />
            </Button>
            <Button variant={viewMode === 'list' ? 'primary' : 'outline'} size="icon" onClick={() => setViewMode('list')} aria-label="List view">
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {loading && <p className="text-center text-lg text-primary">Loading courses...</p>}
      
      {!loading && filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Courses Found</h2>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}

      {!loading && filteredCourses.length > 0 && (
        <div className={`grid gap-6 md:gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} viewMode={viewMode} />
          ))}
        </div>
      )}

      {/* Pagination (Placeholder) */}
      {!loading && filteredCourses.length > 10 && ( // Show pagination if more than 10 courses
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="mr-2">Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;