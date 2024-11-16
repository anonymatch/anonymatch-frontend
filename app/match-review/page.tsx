'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ArrowLeft, X, Heart, Smile, HandshakeIcon, Copy } from 'lucide-react'
import Link from 'next/link'

export default function Component() {
  const [safetyRating, setSafetyRating] = useState<string>('')
  const [genuineRating, setGenuineRating] = useState<string>('')
  const [dateAgainRating, setDateAgainRating] = useState([5])
  const [selectedQualities, setSelectedQualities] = useState<string[]>([])
  const [comments, setComments] = useState('')

  const qualities = [
    { icon: <Heart className="w-5 h-5 text-[#FF4081]" />, label: 'Kind' },
    { icon: <Smile className="w-5 h-5 text-[#FF4081]" />, label: 'Funny' },
    { icon: <HandshakeIcon className="w-5 h-5 text-[#FF4081]" />, label: 'Respectful' }
  ]

  const toggleQuality = (quality: string) => {
    setSelectedQualities(prev => 
      prev.includes(quality)
        ? prev.filter(q => q !== quality)
        : [...prev, quality]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      safetyRating,
      genuineRating,
      dateAgainRating,
      selectedQualities,
      comments
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/dates" className="p-2">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="font-semibold">Review Your Date</h1>
          <button className="p-2">
            <X className="h-6 w-6" />
          </button>
        </div>
      </header>

      <main className="p-4 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-lg">John Doe</h2>
                  <p className="text-sm text-gray-500">Central Park Café</p>
                </div>
                <Copy className="w-5 h-5 text-gray-400 ml-auto" />
              </div>
            </CardContent>
          </Card>

          {/* Safety Rating */}
          <Card>
            <CardHeader>
              <CardTitle>Rate the Connection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Did you feel safe around this person?</Label>
                <RadioGroup
                  value={safetyRating}
                  onValueChange={setSafetyRating}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="safety-yes" />
                    <Label htmlFor="safety-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="safety-no" />
                    <Label htmlFor="safety-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Additional Comments</Label>
                <Textarea
                  placeholder="Share your thoughts..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Positive Qualities */}
          <Card>
            <CardHeader>
              <CardTitle>Positive Qualities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {qualities.map((quality, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant={selectedQualities.includes(quality.label) ? "default" : "outline"}
                    className={`w-full justify-start gap-2 ${
                      selectedQualities.includes(quality.label)
                        ? "bg-[#FF4081] hover:bg-[#FF6B6B]"
                        : ""
                    }`}
                    onClick={() => toggleQuality(quality.label)}
                  >
                    {quality.icon}
                    {quality.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Likelihood to Date Again */}
          <Card>
            <CardHeader>
              <CardTitle>Likelihood to Date Again</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={dateAgainRating}
                  onValueChange={setDateAgainRating}
                  max={10}
                  step={1}
                  className="[&_[role=slider]]:bg-[#FF4081]"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Not Likely</span>
                  <span className="font-semibold text-[#FF4081]">{dateAgainRating}</span>
                  <span>Very Likely</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Genuine Rating */}
          <Card>
            <CardHeader>
              <CardTitle>Did this person feel genuine?</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={genuineRating}
                onValueChange={setGenuineRating}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="genuine-yes" />
                  <Label htmlFor="genuine-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="genuine-no" />
                  <Label htmlFor="genuine-no">No</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full bg-[#FF4081] hover:bg-[#FF6B6B] text-white"
          >
            Submit Review
          </Button>
        </form>
      </main>
    </div>
  )
}