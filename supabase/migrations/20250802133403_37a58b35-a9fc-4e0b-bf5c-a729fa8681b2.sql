-- Create enum types
CREATE TYPE public.currency_type AS ENUM ('RWF', 'USD', 'POINTS');
CREATE TYPE public.video_platform AS ENUM ('INSTAGRAM', 'FACEBOOK', 'TIKTOK');
CREATE TYPE public.payout_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PAID');
CREATE TYPE public.app_role AS ENUM ('ADMIN', 'USER');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  currency currency_type DEFAULT 'POINTS',
  videos_watched_today INTEGER DEFAULT 0,
  last_watch_date DATE DEFAULT CURRENT_DATE,
  referral_code TEXT NOT NULL UNIQUE DEFAULT SUBSTRING(MD5(RANDOM()::TEXT), 1, 8),
  referred_by TEXT,
  referral_count INTEGER DEFAULT 0,
  can_withdraw BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'USER',
  UNIQUE(user_id, role)
);

-- Create videos table
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  platform video_platform NOT NULL,
  embed_url TEXT NOT NULL,
  reward_amount DECIMAL(10,2) DEFAULT 1.00,
  currency currency_type DEFAULT 'POINTS',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create video_watches table
CREATE TABLE public.video_watches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id UUID NOT NULL REFERENCES public.videos(id) ON DELETE CASCADE,
  watch_duration INTEGER NOT NULL, -- in seconds
  completed BOOLEAN DEFAULT FALSE,
  earned_amount DECIMAL(10,2) DEFAULT 0,
  currency currency_type DEFAULT 'POINTS',
  watched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, video_id)
);

-- Create earnings table
CREATE TABLE public.earnings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency currency_type NOT NULL,
  source TEXT NOT NULL, -- 'VIDEO_WATCH', 'REFERRAL_BONUS'
  reference_id UUID, -- video_id or referral_id
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referrals table
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL,
  bonus_earned DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(referred_id)
);

-- Create payout_requests table
CREATE TABLE public.payout_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency currency_type NOT NULL,
  payment_method TEXT NOT NULL,
  payment_details JSONB NOT NULL,
  status payout_status DEFAULT 'PENDING',
  admin_notes TEXT,
  processed_by UUID REFERENCES auth.users(id),
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_watches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payout_requests ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR ALL USING (public.has_role(auth.uid(), 'ADMIN'));

-- Create RLS policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'ADMIN'));

-- Create RLS policies for videos
CREATE POLICY "Anyone can view active videos" ON public.videos
  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admins can manage videos" ON public.videos
  FOR ALL USING (public.has_role(auth.uid(), 'ADMIN'));

-- Create RLS policies for video_watches
CREATE POLICY "Users can view own watches" ON public.video_watches
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own watches" ON public.video_watches
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all watches" ON public.video_watches
  FOR SELECT USING (public.has_role(auth.uid(), 'ADMIN'));

-- Create RLS policies for earnings
CREATE POLICY "Users can view own earnings" ON public.earnings
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert earnings" ON public.earnings
  FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admins can view all earnings" ON public.earnings
  FOR SELECT USING (public.has_role(auth.uid(), 'ADMIN'));

-- Create RLS policies for referrals
CREATE POLICY "Users can view referrals they made or received" ON public.referrals
  FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referred_id);
CREATE POLICY "System can insert referrals" ON public.referrals
  FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admins can view all referrals" ON public.referrals
  FOR SELECT USING (public.has_role(auth.uid(), 'ADMIN'));

-- Create RLS policies for payout_requests
CREATE POLICY "Users can view own payout requests" ON public.payout_requests
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own payout requests" ON public.payout_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all payout requests" ON public.payout_requests
  FOR ALL USING (public.has_role(auth.uid(), 'ADMIN'));

-- Create functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  
  -- Insert default USER role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'USER');
  
  -- Handle referral if referral code was provided
  IF NEW.raw_user_meta_data->>'referral_code' IS NOT NULL THEN
    INSERT INTO public.referrals (referrer_id, referred_id, referral_code)
    SELECT p.user_id, NEW.id, NEW.raw_user_meta_data->>'referral_code'
    FROM public.profiles p
    WHERE p.referral_code = NEW.raw_user_meta_data->>'referral_code';
    
    -- Update referrer's referral count
    UPDATE public.profiles
    SET referral_count = referral_count + 1,
        can_withdraw = (referral_count + 1) >= 10
    WHERE referral_code = NEW.raw_user_meta_data->>'referral_code';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update daily video count
CREATE OR REPLACE FUNCTION public.reset_daily_videos()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Reset daily count if it's a new day
  IF NEW.last_watch_date < CURRENT_DATE THEN
    NEW.videos_watched_today = 0;
    NEW.last_watch_date = CURRENT_DATE;
  END IF;
  
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create trigger for daily video reset
CREATE TRIGGER update_daily_videos
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.reset_daily_videos();

-- Create function for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON public.videos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Insert sample videos
INSERT INTO public.videos (title, platform, embed_url, reward_amount, currency) VALUES
('Funny Cat Videos', 'INSTAGRAM', 'https://www.instagram.com/p/sample1/embed', 1.00, 'POINTS'),
('Dance Challenge', 'TIKTOK', 'https://www.tiktok.com/embed/sample1', 1.50, 'POINTS'),
('Cooking Tips', 'FACEBOOK', 'https://www.facebook.com/plugins/video.php?href=sample1', 1.25, 'POINTS'),
('Travel Vlog', 'INSTAGRAM', 'https://www.instagram.com/p/sample2/embed', 2.00, 'POINTS'),
('Comedy Sketch', 'TIKTOK', 'https://www.tiktok.com/embed/sample2', 1.75, 'POINTS'),
('Tech Review', 'FACEBOOK', 'https://www.facebook.com/plugins/video.php?href=sample2', 1.50, 'POINTS'),
('Music Video', 'INSTAGRAM', 'https://www.instagram.com/p/sample3/embed', 2.25, 'POINTS'),
('Life Hack', 'TIKTOK', 'https://www.tiktok.com/embed/sample3', 1.00, 'POINTS'),
('Sports Highlights', 'FACEBOOK', 'https://www.facebook.com/plugins/video.php?href=sample3', 1.75, 'POINTS'),
('Fashion Tips', 'INSTAGRAM', 'https://www.instagram.com/p/sample4/embed', 1.50, 'POINTS');